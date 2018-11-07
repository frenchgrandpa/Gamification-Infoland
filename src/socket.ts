import * as http from 'http';
import * as socketio from 'socket.io';
import { InfolandAPI,quizObject,question,answer } from './api/infoland/infolandApi';

export default class Socket {

    private io: socketio.Server;
    private infolandAPI: InfolandAPI;
    private index = 0;
    private quiz:quizObject;

    constructor(server: http.Server, infolandAPI: InfolandAPI) {
        this.io = socketio(server);
        this.infolandAPI = infolandAPI;
        this.io.on('connection', (socket) => {
            this.onConnection(socket);
            socket.on("disconnect", (reason) => {
                this.onDisconnect(socket);
            });
            socket.on("msg",function(msg){
                console.log(msg);
            });
        });
    }

    private onConnection(socket: socketio.Socket) {
        console.log('a user connected');
        this.emitPlayerCount();
        this.emitPlayerJoin(socket);
        this.emitNextQuestion();
    }

    private onDisconnect(socket: socketio.Socket) {
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
            // let clientids:any = []
            // for(let client of clients)
            // {
            //     clientids.concat(client.id);
            // }
            this.io.emit('players', clients);
        });
    }

    public emitBombExplosion() {
        this.io.emit('explosion', "true");
    }





    public emitNextQuestion() {
        this.infolandAPI.tokenRetrieval("heer", "test",(err,token )=>{this.infolandAPI.quizRetrieval('c0b63433-712e-4d35-9cd8-828073e6a84c', (quiz) => {
            // while (quiz.questions[this.index] && quiz.questions[this.index].answers.length <= 1 && this.index < quiz.questions.length) {
            //     this.index++;
            // }//console.log(quiz);
            // if (this.index == quiz.questions.length - 1) {

            //     this.io.emit('question', []); return;
            // }
            // this.io.emit('quiz',quiz);
            while(quiz.questions[this.index].mediatype == 1 || quiz.questions[this.index].type != 1)
            {
                this.index++;
            }
            console.log(quiz.questions[this.index]);
            this.io.emit('question', quiz.questions[this.index]);
            // this.index++;
        })});
    }

    public emitAnswer() {
        this.io.emit('answer', /* emit question */);
    }

    public emitPlayerJoin(socket: socketio.Socket) {
    }

    public emitPlayerLeave(socket: socketio.Socket) {
    }

    public emitGameStart() {
        this.io.emit('gameStart', true);
    }

    public emitGameEnd() {
        this.io.emit('gameEnd', true);
    }

    public addAnswerEventHandler(delegate: (msg: any) => void) {
        this.io.on('answer', (msg: any) => {
            delegate(msg);
        });
    }

}