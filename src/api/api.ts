import * as express from 'express';
import { Router, Request, Response } from 'express';

import AccountAPI from './accountApi';
import apiError from './apiError';
import APIBase from './apiBase';
import { InfolandAPI } from './infoland/infolandApi';
import HotPotato from '../games/hotPotato';

export default class API extends APIBase {

    constructor() {
        super();

        this.router.use(this.checkIfLoggedIn);

        this.addRoutes();

        this.router.use('/account', new AccountAPI().router);
    }

    private index = 0;
    protected addRoutes() {
        this.router.get('/vraag', (req, res) => {

            req.user.infolandAPI.quizRetrieval('c0b63433-712e-4d35-9cd8-828073e6a84c', (quiz) => {
                while (quiz.questions[this.index].answers.length <= 1 && this.index < quiz.questions.length) {
                    this.index++;
                }
                if (this.index == quiz.questions.length - 1) { res.send("No more questions"); return; }
                res.send(quiz.questions[this.index++]);
            });
        });

        this.router.post("/startgame", (req, res) => this.postStartgame(req, res));
    }

    private checkIfLoggedIn(req: Request, res: Response, next: () => void) {
        if (!req.user && req.url != '/account/login') {
            apiError.handle403Error(res, 'Not logged in');
            return;
        }
        next();
    }

    private postStartgame(req: Request, res: Response) {
        global.gameManager.runningGames.push(new HotPotato(global.socket));
    }

}