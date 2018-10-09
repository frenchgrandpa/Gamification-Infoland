import * as http from 'http';
import * as socketio from 'socket.io';

export default class Socket {

    private io: socketio.Server;

    constructor(server: http.Server) {
        this.io = socketio(server);
        
        this.io.on('connection', (socket) => {
            this.onConnection(socket);
        });
    }
    
    private onConnection(socket: socketio.Socket) {
        console.log('a user connected');  
        this.emitPlayerCount();      
    }
    
    public emitPlayerCount() {
        this.io.clients((err: any, clients: socketio.Client[]) => {
            this.io.emit('playerCount', clients.length);
        });
    }

    public emitPlayers() {
        
    }

    public emitBombExplosion() {

    }

    public emitQuestion() {

    }

    public emitAnswer() {

    }

    public emitPlayerJoin() {

    }

    public emitPlayerLeave() {

    }

    public emitGameStart() {

    }

    public emitGameEnd() {

    }

}