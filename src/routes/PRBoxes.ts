import { body, validationResult, matchedData } from 'express-validator';
import passport from './../providers/Passport';
import PRBox from './../models/PRBox';
import express from 'express';

export const app = express.Router();


/**
 * GET /api/v1/pr-boxes
 * 
 */
app.get('/pr-boxes', [
    passport.authenticate('jwt', { session: false })
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await PRBox.findAll({
            where: {
                userID: req.user.id
            }
        })
    );
});


/**
 * GET /api/v1/pr-boxes/:pRBoxID
 * 
 */
app.get('/pr-boxes/:pRBoxID', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await PRBox.findByPk(req.params.pRBoxID)
    );
});


/**
 * POST /api/v1/pr-boxes
 * 
 * Create PRBox
 */
app.post('/pr-boxes', [
    passport.authenticate('jwt', { session: false }),
    body('name').exists().isString(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const data = matchedData(req);

    // const pRBox = await PRBox.create({
    //     userID: req.user.id,
    //     name: data.name,
    // });

    // return res.json(pRBox);
});


/**
 * POST /api/v1/pr-boxes/:pRBoxID
 * 
 * Update PRBox
 */
app.post('/pr-boxes/:pRBoxID', [
    passport.authenticate('jwt', { session: false }),
    body('name').exists(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const data = matchedData(req);

    await PRBox.update(data, {
        where: {
            id: req.params.pRBoxID,
        }
    });

    return res.json(await PRBox.findByPk(req.params.pRBoxID));
});



/**
 * DELETE /api/v1/pr-boxes/:pRBoxID
 * 
 * Delete PRBox
 */
app.delete('/pr-boxes/:pRBoxID', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {
    await PRBox.destroy({
        where: {
            id: req.params.pRBoxID,
        }
    });

    return res.json({ id: req.params.pRBoxID });
});
