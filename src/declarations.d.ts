declare interface User {
    username: string
    password: string 
    token: string
}

declare namespace Express {
    export interface Request {
        user?: User
    }
}