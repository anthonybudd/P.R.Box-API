import { body, validationResult, matchedData } from 'express-validator';
import passport from './../../providers/Passport';
import storage from './../../providers/storage';
import Item from './../../models/Item';
import middleware from './../middleware';
import express from 'express';
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
    return res.json(
        await Item.findAll()
    );
});


/**
 * POST /api/v1/admin/items
 * 
 * Recieve an item
 */
app.post('/items', [
    passport.authenticate('jwt', { session: false }),
    middleware.isAdmin,
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    console.log(req.files);

    if (!req.files || !req.files.image) return res.status(422).json({
        errors: {
            components: {
                location: 'body',
                param: 'image',
                msg: 'You must upload an image'
            }
        }
    });

    // const resposne = await storage.putObject({
    //     Key: 'foo.png',
    //     Bucket: process.env.AWS_S3_BUCKET || '',
    //     Body: fs.readFileSync(req.files.image.tempFilePath),
    //     ACL: 'private',
    // }).promise();
    // console.log(resposne);

    await Item.update({
        status: 'Received'
    }, {
        where: {
            id: req.params.itemID,
        }
    });

    return res.json(await Item.findByPk(req.params.itemID));
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
 * POST /api/v1/admin/items/:itemID/set-status
 * 
 * Update items
 */
app.post('/items/:itemID/set-status', [
    passport.authenticate('jwt', { session: false }),
    middleware.isAdmin,
    body('status').exists().isIn(['Received', 'Shipped', 'Delivered']),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const { status } = matchedData(req);

    await Item.update({
        status
    }, {
        where: {
            id: req.params.itemID,
        }
    });

    return res.json(await Item.findByPk(req.params.itemID));
});


