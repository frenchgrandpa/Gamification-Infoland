import * as mysql from 'mysql';
import { Connection, MysqlError, ConnectionConfig } from 'mysql';

export default class SQL {
    
    public queue = require('queue')({ concurency: 1, autostart: true, timeout: 5000 });

    private connection: Connection;
    private isDead = false;
    private fatalError = "DB_DOWN";

    constructor(config: ConnectionConfig) {
        this.connection = this.initializeConnection(config);
    }

    private initializeConnection(config: ConnectionConfig): Connection {
        var connection = mysql.createConnection(config);
        this.addDisconnectHandler(connection);
        connection.connect();
        return connection;
    }

    private addDisconnectHandler(connection: Connection) {
        connection.on("error", (error: MysqlError) => {
            if (error instanceof Error) {
                if (error.fatal) {
                    this.fatalError = error.code;
                    console.log(this.fatalError);
                    this.isDead = true;
                    return;
                }
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");
                    setTimeout(() => this.initializeConnection(connection.config), 10000);
                }
            }
        });
    }

    public getUserByEmail(email: string, callback: (err: string, user: User) => void) {
        if (this.isDead) return callback(this.fatalError, null);
        let query = "SELECT * FROM user WHERE email = ?";
        query = mysql.format(query, [email]);
        this.connection.query(query, (err, result) => {
            if (err)
                return callback(err.code, null);
            if (result.length != 1)
                return callback(null, null);

            return callback(null, result[0]);
        });
    }

    public addUser(user: User, callback: (err: string) => void) {
        if (this.isDead) return callback(this.fatalError);
        let query = "INSERT INTO user (id, email, passwordHash, balance) VALUES (?, ?, ?, ?)";
        query = mysql.format(query, [
            user.id,
            user.email,
            user.passwordHash,
            user.balance
        ]);
        this.connection.query(query, (err, result) => {
            if (err)
                return callback(err.code);
            return callback(null);
        });
    }

    public getBalance(userId: string, callback: (err: string, balance: number) => void) {
        if (this.isDead) return callback(this.fatalError, null);
        let query = "SELECT balance FROM user WHERE id = ?";
        query = mysql.format(query, [userId]);
        this.connection.query(query, (err, result) => {
            if (err)
                return callback(err.code, null);
            if (result.length != 1)
                return callback(null, null);

            return callback(null, result[0].balance);
        });
    }

    public changeEmail(userId: string, email: string, callback: (err: string) => void) {
        if (this.isDead) return callback(this.fatalError);
        let query = "UPDATE user SET email = ? WHERE id = ?";
        query = mysql.format(query, [
            email,
            userId
        ]);
        this.connection.query(query, (err, result) => {
            if (err)
                return callback(err.code);
            return callback(null);
        });        
    }

    public changePasswordHash(userId: string, hash: string, callback: (err: string) => void) {
        if (this.isDead) return callback(this.fatalError);
        let query = "UPDATE user SET passwordHash = ? WHERE id = ?";
        query = mysql.format(query, [
            hash,
            userId
        ]);
        this.connection.query(query, (err, result) => {
            if (err)
                return callback(err.code);
            return callback(null);
        });        
    }

} 