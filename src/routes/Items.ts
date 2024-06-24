import { body, validationResult, matchedData } from 'express-validator';
import passport from './../providers/Passport';
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
    return res.json(
        await Item.findAll({
            where: {
                userID: req.user.id,
            }
        })
    );
});


/**
 * GET /api/v1/items/:itemID
 * 
 */
app.get('/items/:itemID', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await Item.findByPk(req.params.itemID)
    );
});
