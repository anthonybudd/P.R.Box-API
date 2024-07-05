import { body, validationResult, matchedData } from 'express-validator';
import passport from './../../providers/passport';
import middleware from './../middleware';
import PRBox from './../../models/PRBox';
import User from './../../models/User';
import express from 'express';
import crypto from 'crypto';

export const app = express.Router();


/**
 * GET /api/v1/admin/users
 * 
 */
app.get('/users', [
    passport.authenticate('jwt', { session: false }),
    middleware.isAdmin,
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await User.findAll({
            include: [PRBox]
        })
    );
});


/**
 * POST /api/v1/admin/users/:userID/set-status
 * 
 * Update user status
 */
app.post('/users/:userID/set-status', [
    passport.authenticate('jwt', { session: false }),
    middleware.isAdmin,
    body('status').exists().isIn(['Pending', 'Approved', 'Blocked']),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const { status } = matchedData(req);

    const user = await User.findByPk(req.params.userID);

    if (!user) return res.status(404).json({
        msg: 'User not found',
        code: 40409
    });

    await user.update({ status });

    return res.json(await User.findByPk(req.params.userID));
});


/**
 * POST /api/v1/admin/users/:userID/assign-prbox
 * 
 * Assign PRBox
 */
app.post('/users/:userID/assign-prbox', [
    passport.authenticate('jwt', { session: false }),
    middleware.isAdmin,
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    const user = await User.findByPk(req.params.userID);

    if (!user) return res.status(404).json({
        msg: 'User not found',
        code: 40409
    });

    if (!user.PRBoxID) {
        const prBox = await PRBox.create({
            name: `P.R Box ${crypto.randomBytes(20).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 5).toUpperCase()}`,
            addressLine1: process.env.DEFAULT_ADDRESS_LINE_1 || '100 Fake St',
            addressLine2: process.env.DEFAULT_ADDRESS_LINE_2 || 'Unit C-305',
            addressLine3: process.env.DEFAULT_ADDRESS_LINE_3 || '',
            city: process.env.DEFAULT_CITY || 'Austin',
            zipcode: process.env.DEFAULT_ZIPCODE || '78702',
            state: process.env.DEFAULT_STATE || 'Texas',
        });

        await user.update({
            PRBoxID: prBox.get('id'),
            status: 'Approved',
        });
    }

    return res.json(await User.findByPk(req.params.userID));
});
