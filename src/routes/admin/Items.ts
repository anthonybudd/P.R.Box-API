import { body, validationResult, matchedData } from 'express-validator';
import passport from './../../providers/passport';
import storage from './../../providers/storage';
import Stripe from './../../providers/Stripe';
import Charge from './../../models/Charge';
import middleware from './../middleware';
import Item from './../../models/Item';
import User from './../../models/User';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import BN from 'bignumber.js';
import * as path from 'path';
import moment from 'moment';
import * as fs from 'fs';

export const app = express.Router();


/**
 * GET /api/v1/admin/items
 * 
 */
app.get('/items', [
    passport.authenticate('jwt', { session: false }),
    middleware.isAdmin,
], async (req: express.Request, res: express.Response) => {
    const items = await Item.findAll({ raw: true });
    for (let i = 0; i < items.length; i++) {
        items[i].image = storage.getSignedUrl('getObject', {
            Bucket: process.env.AWS_S3_BUCKET || '',
            Key: items[i].image,
            Expires: (12 * 60 * 60) //12hrs
        });
    }
    return res.json(items);
});


/**
 * POST /api/v1/admin/items
 * 
 * Recieve an item
 */
app.post('/items', [
    passport.authenticate('jwt', { session: false }),
    middleware.isAdmin,
    body('PRBoxID').exists().isUUID(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const { PRBoxID } = matchedData(req);

    const user = await User.findOne({
        where: { PRBoxID }
    });

    if (!user) return res.status(404).json({
        msg: 'User not found',
        code: 40389,
    });

    if (!req.files || !req.files.image) return res.status(422).json({
        errors: {
            components: {
                location: 'body',
                param: 'image',
                msg: 'You must upload an image'
            }
        }
    });

    let image = req.files.image;
    if (Array.isArray(image)) image = image[0];
    const imageExtenstion = path.extname(image.name).toLowerCase();
    const Key = `${uuidv4()}${imageExtenstion}`;
    await storage.putObject({
        Key,
        Bucket: process.env.AWS_S3_BUCKET || '',
        Body: fs.readFileSync(image.tempFilePath),
        ACL: 'private',
    }).promise();

    const item = await Item.create({
        status: 'Received',
        PRBoxID,
        userID: user.id,
        image: Key,
        receivedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    });

    return res.json(item);
});


/**
 * GET /api/v1/admin/items/:itemID
 * 
 */
app.get('/items/:itemID', [
    passport.authenticate('jwt', { session: false }),
    middleware.isAdmin,
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await Item.findByPk(req.params.itemID)
    );
});


/**
 * POST /api/v1/admin/items/:itemID/ship
 * 
 * Ship item 
 */
app.post('/items/:itemID/ship', [
    passport.authenticate('jwt', { session: false }),
    middleware.isAdmin,
    body('weight').notEmpty().exists(),
    body('tracking').notEmpty().exists(),
    body('carrier').notEmpty().exists(),
    body('price').notEmpty().exists().isNumeric(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const { weight, tracking, price, carrier } = matchedData(req);

    const item = await Item.findByPk(req.params.itemID);

    if (!item) return res.status(404).json({
        msg: 'Item not found',
        code: 40400,
    });

    const user = await User.unscoped().findByPk(item.userID);

    if (!user) return res.status(404).json({
        msg: 'User not found',
        code: 40400,
    });

    if (!req.files || !req.files.imageShipped) return res.status(422).json({
        errors: {
            components: {
                location: 'body',
                param: 'imageShipped',
                msg: 'You must upload an image'
            }
        }
    });

    let image = req.files.imageShipped;
    if (Array.isArray(image)) image = image[0];
    const imageExtenstion = path.extname(image.name).toLowerCase();
    const Key = `${uuidv4()}${imageExtenstion}`;
    await storage.putObject({
        Key,
        Bucket: process.env.AWS_S3_BUCKET || '',
        Body: fs.readFileSync(image.tempFilePath),
        ACL: 'private',
    }).promise();

    const serviceFee = new BN(process.env.SERVICE_FEE || "5");
    const amount = new BN(price).plus(serviceFee);
    const paymentIntent = await Stripe.paymentIntents.create({
        amount: Number(new BN(amount).times(100).toFixed(2, 6)),
        customer: user.stripeCustomerID || '',
        payment_method: user.stripePaymentMethod || '',
        currency: 'usd',
        confirm: true,
        return_url: process.env.FRONTEND_URL || '',
        automatic_payment_methods: {
            enabled: true,
        },
    });

    await item.update({
        status: 'Shipped',
        shippedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        weight,
        tracking,
        carrier,
        price,
        imageShipped: Key,
    });

    await Charge.create({
        userID: user.id,
        itemID: item.id,
        stripePaymentResponse: JSON.stringify(paymentIntent),
        amount: amount.toFixed(2, 6),
        description: `Shipping: $${price} Service Charge: $${serviceFee}`,
    });

    return res.json(await Item.findByPk(req.params.itemID));
});
