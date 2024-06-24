import { body, validationResult, matchedData } from 'express-validator';
import passport from './../../providers/Passport';
import Item from './../../models/Item';
import express from 'express';
import middleware from './../middleware';

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
