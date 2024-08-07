import { body, validationResult, matchedData } from 'express-validator';
import passport from './../providers/passport';
import storage from './../providers/storage';
import Item from './../models/Item';
import express from 'express';

export const app = express.Router();


/**
 * GET /api/v1/items
 * 
 */
app.get('/items', [
    passport.authenticate('jwt', { session: false })
], async (req: express.Request, res: express.Response) => {
    const items = await Item.findAll({
        raw: true,
        where: {
            userID: req.user.id,
        },
    });
    for (let i = 0; i < items.length; i++) {
        items[i].image = storage.getSignedUrl('getObject', {
            Bucket: process.env.AWS_S3_BUCKET || '',
            Key: items[i].image,
            Expires: (12 * 60 * 60) // 12hrs
        });
    }
    return res.json(items);
});


/**
 * GET /api/v1/items/:itemID
 * 
 */
app.get('/items/:itemID', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {
    const item = await Item.findByPk(req.params.itemID, { raw: true });

    if (!item) return res.status(404).json({
        msg: 'Item not found',
        code: 40403
    });

    item.image = storage.getSignedUrl('getObject', {
        Bucket: process.env.AWS_S3_BUCKET || '',
        Key: item.image,
        Expires: (12 * 60 * 60) // 12hrs
    });

    return res.json(item);
});
