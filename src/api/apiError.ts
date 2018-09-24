import { Response } from 'express';

export default class apiError {

    
    public static handle400Error(res: Response, err?: string) {
        res.status(400).send({
            success: false,
            status: 400,
            err: err || 'Malformed Request'
        });
    }

    public static handle403Error(res: Response, err?: string) {
        res.status(403).send({
            success: false,
            status: 403,
            err: err || 'Forbidden'
        });
    }

    public static handle404Error(res: Response, err?: string) {
        res.status(404).send({
            success: false,
            status: 404,
            err: err || 'Not found'
        });
    }

    public static handle500Error(res: Response, err?: string) {
        res.status(500).send({
            success: false,
            status: 500,
            err: err || 'Internal Server Error'
        });
    }

}