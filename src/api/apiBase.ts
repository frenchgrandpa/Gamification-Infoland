import { Router } from "express";
import * as express from 'express';
import { InfolandAPI } from "./infoland/infolandApi";

export default abstract class APIBase {

    public router: Router;
    
    protected infolandAPI = new InfolandAPI('https://pubquiz.iqualify.nl');

    constructor() {        
        this.router = express.Router();
    }

    protected abstract addRoutes(): void;

}