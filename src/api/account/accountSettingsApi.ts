import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';

import SQL from '../../sql';
import apiError from '../apiError';

export default class AccountSettingsAPI {

    public router: Router;
    private sql: SQL;

    constructor(sql: SQL) {
        this.router = express.Router();
        this.sql = sql;

        this.addRoutes();
    }

    private addRoutes() {
        this.router.post('/email', (req, res) => { this.postEmail(req, res) });
        this.router.post('/password', (req, res) => { this.postPassword(req, res) });
    }

    private postEmail(req: Request, res: Response) {
        if (!req.body.email || typeof req.body.email != 'string' || !req.body.email.match(/^\S+@\S+$/))
            return apiError.handle400Error(res);

        this.sql.changeEmail(req.user.id, req.body.email, (err) => {
            if (err) return apiError.handle500Error(res, err);

            req.user.email = req.body.email;

            res.send({ success: true });
        });
    }

    private postPassword(req: Request, res: Response) {
        if (!req.body.password || typeof req.body.password != 'string' || req.body.password.length < 8)
            return apiError.handle400Error(res);

        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) return apiError.handle500Error(res, err.name);

            this.sql.changePasswordHash(req.user.id, hash, (err) => {
                if (err) return apiError.handle500Error(res, err);

                req.user.passwordHash = hash;

                res.send({ success: true });
            });
        });
    }

}