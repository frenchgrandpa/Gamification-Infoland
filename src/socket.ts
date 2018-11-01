import * as http from 'http';
import * as socketio from 'socket.io';

export default class Socket {

    private io: socketio.Server;

    constructor(server: http.Server) {
        this.io = socketio(server);
        
        this.io.on('connection', (socket) => {
            this.onConnection(socket);
            socket.on("disconnect",(reason)=>{
                this.onDisconnect(socket);
            });
        });
    }
    
    private onConnection(socket: socketio.Socket) {
        console.log('a user connected');  
        this.emitPlayerCount();
        this.emitPlayerJoin(socket);      
    }

    private onDisconnect(socket: socketio.Socket)
    {
        console.log('a user disconnected');
        this.emitPlayerCount();
        this.emitPlayerLeave(socket);
    }

    public emitPlayerCount() {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            this.io.emit('playerCount', clients.length);
        });
    }

    public emitPlayers() {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            let clientids:any = []
            for(let client of clients)
            {
                clientids.concat(client.id);
            }
            this.io.emit('players', clientids);
        });
    }

    public emitBombExplosion() {

    }

    public emitQuestion() {

    }

    public emitAnswer() {

    }

    public emitPlayerJoin(socket:socketio.Socket) {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            socket.broadcast.emit('message', "een nieuwe speler is aangekomen");
        });
    }

    public emitPlayerLeave(socket:socketio.Socket) {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            socket.broadcast.emit('message', "een speler heeft het spel verlaten");
        });
    }

    public emitGameStart() {

    }

    public emitGameEnd() {

    }

}