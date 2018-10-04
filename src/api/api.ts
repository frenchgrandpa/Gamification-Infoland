import * as express from 'express';
import { Router, Request, Response } from 'express';

import AccountAPI from './accountApi';
import apiError from './apiError';
import APIBase from './apiBase';

export default class API extends APIBase {

    constructor() {
        super();

        this.router.use(this.checkIfLoggedIn);

        this.router.use('/account', new AccountAPI().router);
    }

    protected addRoutes() {
        
    }

    private checkIfLoggedIn(req: Request, res: Response, next: () => void) {
        if (!req.user && req.url != '/account/login') {
            apiError.handle403Error(res, 'Not logged in');
            return;
        }
        next();
    }

}