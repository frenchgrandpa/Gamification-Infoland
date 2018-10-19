import { Request, Response } from 'express';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import APIBase from 'Gamification-Infoland/src/api/apiBase';
import { InfolandAPI } from 'Gamification-Infoland/src/api/infoland/infolandApi';
import User, { UserData } from 'Gamification-Infoland/src/user';

export default class AccountAPI extends APIBase {

    constructor() {
        super();

        this.initPassport();

        this.addRoutes();
    }

    private initPassport() {
        passport.serializeUser((userData: UserData, done) => { done(null, userData) });
        passport.deserializeUser((userData: UserData, done) => { done(null, new User(userData, this.infolandAPI)) });

        this.addLocalLoginStrategy();
    }

    private addLocalLoginStrategy() {
        passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
            (username, password, done) => {
                User.login(this.infolandAPI, username, password, (err, token) => {
                    if (err) return done(err);
                    if (!token) return done(null, false);

                    return done(null, {
                        username: username,
                        password: password,
                        token: token
                    });
                })
            }
        ));
    }

    protected addRoutes() {
        this.router.post('/login',
            passport.authenticate('local-login', { failureRedirect: 'login/fail' }),
            (req, res) => { this.postLogin(req, res) });

        this.router.get('/login/fail', (req, res) => { this.getLoginFail(req, res) });

        this.router.post('/logout', (req, res) => { this.postLogout(req, res) });
    }

    private postLogin(req: Request, res: Response) {
        res.send({
            success: true
        });
    }

    private getLoginFail(req: Request, res: Response) {
        res.send({
            success: false
        });
    }

    private postLogout(req: Request, res: Response) {
        req.session.destroy(() => { });
        req.logout();
        res.redirect('/');
    }

}
