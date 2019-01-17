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
        this.router.get("/isrunning/:gameid", (req, res) => this.getIsrunning(req, res));
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
        if (!global.gameManager.runningGames[req.params.gameid] || global.gameManager.runningGames[req.params.gameid].finished) {
            if (req.params.gameid == 2) {
                global.gameManager.runningGames[req.params.gameid] = new HotPotato(global.websockets["game/hotpotato/" + req.params.gameid] as HotPotatoSocket, '5628607c-895a-4bd2-af32-eceb22910cf1');                
            } else
            global.gameManager.runningGames[req.params.gameid] = new HotPotato(global.websockets["game/hotpotato/" + req.params.gameid] as HotPotatoSocket, 'e09e2143-ef73-4351-b1f8-f3c10295f0e4');
        }
        res.send();
    }

    private getIsrunning(req: Request, res: Response) {        
        res.send(!(!global.gameManager.runningGames[req.params.gameid] || global.gameManager.runningGames[req.params.gameid].finished));
    }

}