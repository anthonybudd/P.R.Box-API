import { body, validationResult, matchedData } from 'express-validator';
import passport from './../../providers/Passport';
import PRBox from './../../models/PRBox';
import express from 'express';
import middleware from './../middleware';

export const app = express.Router();


/**
 * GET /api/v1/admin/pr-boxes
 * 
 */
app.get('/pr-boxes', [
    passport.authenticate('jwt', { session: false }),
    middleware.isAdmin,
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await PRBox.findAll()
    );
});


