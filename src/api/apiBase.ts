import { Router } from "express";
import * as express from 'express';

export default abstract class APIBase {

    public router: Router;

    constructor() {        
        this.router = express.Router();
    }

    protected abstract addRoutes(): void;

}