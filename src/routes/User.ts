import { body, validationResult, matchedData } from 'express-validator';
import { User, UserModel } from './../models/User';
import passport from './../providers/Passport';
import { prZipcodes } from './../providers/Helpers';
import Stripe from './../providers/Stripe';
import Charges from './../models/Charge';
import middleware from './middleware';
import Group from './../models/Group';
import bcrypt from 'bcrypt-nodejs';
import express from 'express';

export const app = express.Router();


/**
 * GET /api/v1/user
 * 
 */
app.get('/user', [
    passport.authenticate('jwt', { session: false })
], async (req: express.Request, res: express.Response) => {
    const user = await User.findByPk(req.user.id, {
        include: [Group],
    });

    if (!user) return res.status(404).send('User not found');

    return res.json(user);
});


/**
 * POST /api/v1/user
 * 
 */
app.post('/user', [
    passport.authenticate('jwt', { session: false }),
    body('firstName').optional(),
    body('lastName').optional(),
    body('bio').optional(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const data = matchedData(req);

    await User.update(data, { where: { id: req.user.id } });

    return res.json(
        await User.findByPk(req.user.id)
    );
});


/**
 * GET /api/v1/user/resend-verification-email
 * 
 */
app.post('/user/resend-verification-email', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {
    const user = await User.unscoped().findByPk(req.user.id);

    if (!user) return res.status(404).json({
        msg: 'User not found',
        code: 40403
    });

    await user.update({
        emailVerificationKey: String(Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111),
    });


    //////////////////////////////////////////
    // EMAIL THIS TO THE USER
    const emailVerificationLink = `${process.env.BACKEND_URL}/auth/verify-email/${user.emailVerificationKey}?redirect=1`;
    if (typeof global.it !== 'function') console.log(`\n\nEMAIL THIS TO THE USER\nEMAIL VERIFICATION LINK: ${emailVerificationLink}\n\n`);
    //////////////////////////////////////////

    return res.json({ email: user.email });
});


/**
 * POST /api/v1/user/update-password
 * 
 * Update Password
 */
app.post('/user/update-password', [
    passport.authenticate('jwt', { session: false }),
    middleware.checkPassword,
    body('password')
        .notEmpty()
        .exists(),
    middleware.isStrongPassword,
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const data = matchedData(req);

    await User.unscoped().update({
        password: bcrypt.hashSync(data.newPassword, bcrypt.genSaltSync(10)),
    }, {
        where: {
            id: req.user.id,
        }
    });

    return res.json({ success: true });
});


/**
 * POST /api/v1/user/update-address
 * 
 * Update Address
 */
app.post('/user/update-address', [
    passport.authenticate('jwt', { session: false }),
    body('addressLine1').notEmpty().exists(),
    body('addressLine2'),
    body('addressLine3'),
    body('city').notEmpty().exists(),
    body('zipcode').notEmpty().exists().isIn(prZipcodes),
    // body('state').notEmpty().exists(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const data = matchedData(req);

    await User.update({
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        addressLine3: data.addressLine3,
        city: data.city,
        zipcode: data.zipcode,
        state: 'Puerto Rico',
    }, {
        where: {
            id: req.user.id,
        }
    });

    return res.json({ success: true });
});


/**
 * GET /api/v1/user/charges
 * 
 */
app.get('/user/charges', [
    passport.authenticate('jwt', { session: false })
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await Charges.findAll({
            where: {
                userID: req.user.id
            }
        })
    );
});


/**
 * GET /api/v1/user/charges/:chargesID
 * 
 */
app.get('/user/charges/:chargesID', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {

    const charge = await Charges.findByPk(req.params.chargesID);

    if (!charge) return res.status(404).json({
        msg: 'Charge not found',
        code: 98646,
    });

    if (!charge.userID !== req.user.id) return res.status(401).json({
        msg: 'You do not have access to this charge',
        code: 98848,
    });

    return res.json(charge);
});


/**
 * GET /api/v1/user/stripe/setup-intent
 * 
 */
app.get('/user/stripe/setup-intent', [
    passport.authenticate('jwt', { session: false })
], async (req: express.Request, res: express.Response) => {
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({
        msg: 'User not found',
        code: 404,
    });

    if (!user.stripeCustomerID) {
        const { id: stripeCustomerID } = await Stripe.customers.create({
            description: user.id,
            email: user.email,
        });
        await user.update({ stripeCustomerID });
    }

    const setupIntent = await Stripe.setupIntents.create({
        customer: user.stripeCustomerID || '',
        payment_method_types: ['card'],
    });

    return res.json({ clientSecret: setupIntent.client_secret });
});


/**
 * GET /api/v1/user/stripe/last-4
 * 
 */
app.get('/user/stripe/last-4', [
    passport.authenticate('jwt', { session: false })
], async (req: express.Request, res: express.Response) => {
    const user = await User.findByPk(req.user.id);

    let success = false;

    if (!user) return res.status(404).json({
        msg: 'User not found',
        code: 404,
    });

    if (user.stripeCustomerID) {
        const { data: paymentMethods } = await Stripe.customers.listPaymentMethods(user.stripeCustomerID);

        console.log(paymentMethods);

        for (let i = 0; i < paymentMethods.length; i++) {
            const paymentMethod = paymentMethods[i];
            if (paymentMethod && paymentMethod.card && paymentMethod.card.last4) {
                await user.update({
                    stripeLast4: paymentMethod.card.last4
                });
            }
        }

        success = true;
    }

    return res.json({ success });
});
