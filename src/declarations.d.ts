declare interface User {
    id: string
    email: string
    passwordHash: string
}

declare namespace Express {
    export interface Request {
        user?: User
    }
}