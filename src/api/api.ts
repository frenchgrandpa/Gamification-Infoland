import * as express from 'express';
import { Router, Request, Response } from 'express';

import AccountAPI from './accountApi';
import apiError from './apiError';
import APIBase from './apiBase';
import { InfolandAPI } from './infoland/infolandApi';
import HotPotato from '../games/hotPotato';
import HotPotatoSocket from '../sockets/hotPotatoSocket';

export default class API extends APIBase {

    constructor() {
        super();

        this.router.use(this.checkIfLoggedIn);

        this.addRoutes();

        this.router.use('/account', new AccountAPI().router);
    }

    private index = 0;
    protected addRoutes() {
        /*this.router.get('/vraag', (req, res) => {

            req.user.infolandAPI.quizRetrieval('c0b63433-712e-4d35-9cd8-828073e6a84c', (quiz) => {
                while (quiz.questions[this.index].answers.length <= 1 && this.index < quiz.questions.length) {
                    this.index++;
                }
                if (this.index == quiz.questions.length - 1) { res.send("No more questions"); return; }
                res.send(quiz.questions[this.index++]);
            });
        });*/

        this.router.get("/startgame/:gameid", (req, res) => this.getStartgame(req, res));
    }

    private checkIfLoggedIn(req: Request, res: Response, next: () => void) {
        return next();
        if (!req.user && req.url != '/account/login') {
            apiError.handle403Error(res, 'Not logged in');
            return;
        }
        next();
    }

    private getStartgame(req: Request, res: Response) {
        if (!global.gameManager.runningGames[req.params.gameid] || global.gameManager.runningGames[req.params.gameid].finished)
            global.gameManager.runningGames[req.params.gameid] = new HotPotato(global.websockets["game/hotpotato/" + req.params.gameid] as HotPotatoSocket);
        res.send();
    }

}