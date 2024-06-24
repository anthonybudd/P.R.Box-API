import { NextFunction, Request, Response } from "express";
import User from './../../models/User';

export default async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(401).json({
        msg: `user not found`,
        code: 22842,
    });

    if (user.type === 'Admin') return next();

    return res.status(401).json({
        msg: `You do not have access to this page`,
        code: 94783,
    });
};
