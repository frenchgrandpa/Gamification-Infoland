import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as uuid from 'uuid/v4';
import * as bcrypt from 'bcryptjs';

import SQL from '../../sql';
import AccountSettingsAPI from './accountSettingsApi';

export default class AccountAPI {

    public router: Router;
    private sql: SQL;

    constructor(sql: SQL) {
        this.sql = sql;
        this.router = express.Router();

        this.initPassport();

        this.addRoutes();

        this.router.use('/settings', new AccountSettingsAPI(sql).router);
    }

    private initPassport() {
        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((user, done) => done(null, user));

        this.addLocalRegisterStrategy();
        this.addLocalLoginStrategy();
    }

    private addLocalRegisterStrategy() {
        passport.use('local-register', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            (email, password, done) => {
                this.sql.getUserByEmail(email, (err, user) => {
                    if (err) return done(err);
                    if (user || !email.match(/^\S+@\S+$/) || password.length < 8) return done(null, false);

                    const saltRounds = 10;
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        if (err) return done(err);

                        let newUser: User = {
                            id: uuid(),
                            email: email,
                            passwordHash: hash
                        };

                        this.sql.addUser(newUser, (err) => {
                            if (err) return done(err);

                            return done(null, newUser);
                        });

                    });

                });
            }
        ));
    }

    private addLocalLoginStrategy() {
        passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            (email, password, done) => {
                this.sql.getUserByEmail(email, (err, user) => {
                    if (err) return done(err);
                    if (!user) return done(null, false);

                    bcrypt.compare(password, user.passwordHash, (err, isCorrect) => {
                        if (err) return done(err);
                        if (!isCorrect) return done(null, false);

                        return done(null, user);
                    });

                });
            }
        ));
    }

    private addRoutes() {
        this.router.post('/register',
            passport.authenticate('local-register', { failureRedirect: 'register/fail', }),
            (req, res) => { this.postRegister(req, res) });

        this.router.post('/login',
            passport.authenticate('local-login', { failureRedirect: 'login/fail' }),
            (req, res) => { this.postLogin(req, res) });

        this.router.get('/register/fail', (req, res) => { this.getRegisterFail(req, res) });
        this.router.get('/login/fail', (req, res) => { this.getLoginFail(req, res) });
        
        this.router.post('/logout', (req, res) => { this.postLogout(req, res) });
    }

    private postRegister(req: Request, res: Response) {
        res.send({
            success: true
        });
    }

    private getRegisterFail(req: Request, res: Response) {
        res.send({
            success: false
        });
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