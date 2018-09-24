import * as express from 'express';
import { Router, Request, Response } from 'express';

import SQL from '../sql';
import AccountAPI from './account/accountApi';
import apiError from './apiError';

export default class API {

    public router: Router;

    constructor(sql: SQL) {
        this.router = express.Router();

        this.router.use(this.checkIfLoggedIn);

        this.router.use('/account', new AccountAPI(sql).router);
    }

    private checkIfLoggedIn(req: Request, res: Response, next: () => void) {
        if (!req.user && req.url != '/account/register' && req.url != '/account/login') {
            apiError.handle403Error(res, 'Not logged in');
            return;
        }
        next();
    }

}