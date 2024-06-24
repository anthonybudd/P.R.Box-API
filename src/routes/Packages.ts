import { body, validationResult, matchedData } from 'express-validator';
import passport from './../providers/Passport';
import Package from './../models/Package';
import express from 'express';

export const app = express.Router();


/**
 * GET /api/v1/packages
 * 
 */
app.get('/packages', [
    passport.authenticate('jwt', { session: false })
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await Package.findAll({
            where: {
                userID: req.user.id,
            }
        })
    );
});


/**
 * GET /api/v1/packages/:packageID
 * 
 */
app.get('/packages/:packageID', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await Package.findByPk(req.params.packageID)
    );
});


/**
 * POST /api/v1/packages
 * 
 * Create Package
 */
app.post('/packages', [
    passport.authenticate('jwt', { session: false }),
    body('name').exists().isString(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const data = matchedData(req);

    // const pkg = await Package.create({
    //     userID: req.user.id,
    //     name: data.name,
    // });

    // return res.json(pkg);
});


/**
 * POST /api/v1/packages/:packageID
 * 
 * Update Package
 */
app.post('/packages/:packageID', [
    passport.authenticate('jwt', { session: false }),
    body('name').exists(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const data = matchedData(req);

    await Package.update(data, {
        where: {
            id: req.params.packageID,
        }
    });

    return res.json(await Package.findByPk(req.params.packageID));
});



/**
 * DELETE /api/v1/packages/:packageID
 * 
 * Delete Package
 */
app.delete('/packages/:packageID', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {
    await Package.destroy({
        where: {
            id: req.params.packageID,
        }
    });

    return res.json({ id: req.params.packageID });
});
