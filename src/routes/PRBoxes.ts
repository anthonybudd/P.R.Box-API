import { body, validationResult, matchedData } from 'express-validator';
import passport from './../providers/Passport';
import User from './../models/User';
import PRBox from './../models/PRBox';
import express from 'express';

export const app = express.Router();


/**
 * GET /api/v1/pr-box
 * 
 */
app.get('/pr-box', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {
    const user = await User.unscoped().findByPk(req.user.id);

    if (!user) return res.status(404).json({
        msg: 'User not found',
        code: 40403
    });

    if (!user.PRBoxID) return res.status(400).json({
        msg: 'User does not have a PR Box assigned',
        code: 40403
    });

    return res.json(
        await PRBox.findByPk(user.PRBoxID)
    );
});
