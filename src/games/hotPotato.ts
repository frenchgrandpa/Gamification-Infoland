import User from '../user';
import Game from './game';
import Socket from '../socket';
import { question } from '../api/infoland/infolandApi';

export default class HotPotato extends Game {

    public maxPlayers = 5;

    private startTime: number;
    private detonationTime: number;
    private socketClient: Socket;
    private detonationTimeout: NodeJS.Timer;

    private players: string[];
    private playerWithBomb: string;

    private finished = false;

    constructor(socketClient: Socket) {
        super();
        
        this.socketClient = socketClient;
        socketClient.getClients(clients => {
            this.players = clients as unknown[] as string[];
            this.playerWithBomb = this.players[0];
        });

        this.startTime = Date.now();
        this.detonationTime = this.startTime + Math.round((Math.random() * 100 + 5) * 1000);

        this.setDetonationTimeout();
        this.addSocketEventHandlers();
        this.socketClient.emitGameStart();        
        this.socketClient.emitPlayerWithBomb(this.playerWithBomb);
        this.socketClient.emitBombState(2);
        this.emitNextQuestion();
    }

    private getDetonationInterval() {
        return this.detonationTime - Date.now();
    }

    private setDetonationTimeout() {
        clearTimeout(this.detonationTimeout);
        this.detonationTimeout = setTimeout(() => {
            this.socketClient.emitBombExplosion();
            this.finished = true;
        }, this.getDetonationInterval());
        this.detonationTimeout = setTimeout(() => {
            this.socketClient.emitBombState(3);
        }, this.getDetonationInterval() / 2);
        this.socketClient.emitGameEnd();
    }


    private addSocketEventHandlers() {
        this.socketClient.setAnswerEventHandler((socket, data) => this.onAnswer(socket, data));
    }

    private onAnswer(socket: SocketIO.Socket, data: any) {
        if (socket.id != this.playerWithBomb || this.finished)
            return;
        //global.infolandAPI.checkanswer("c0b63433-712e-4d35-9cd8-828073e6a84c", this.currentQuestion, [this.currentQuestion.answers[0]], null);//geen callback?¿??
        let correct = (data === this.currentQuestion.answers[0].id) ? true : false;
        if (correct) {
            // this.addPointToPlayer();
            this.giveBombToNextPlayer();
        } else {
            this.detonationTime -= 5000;
            this.setDetonationTimeout();
        }

        this.socketClient.emitAnswerResult(correct);
        this.emitNextQuestion();
    }

    private bombIndex = 0;
    private giveBombToNextPlayer() {
        if (this.finished)
            return;
            
        if (this.bombIndex < this.players.length - 1)
            this.bombIndex++;
        else
            this.bombIndex = 0;
        this.playerWithBomb = this.players[this.bombIndex];
        console.log(this.playerWithBomb + " has the bomb");
        this.socketClient.emitPlayerWithBomb(this.playerWithBomb);
    }

    private questionIndex = 0;
    private currentQuestion: question;
    private emitNextQuestion() {
        if (this.finished)
            return;
        global.infolandAPI.tokenRetrieval("heer", "test", (err, token) => {
            global.infolandAPI.quizRetrieval('c0b63433-712e-4d35-9cd8-828073e6a84c', (quiz) => {
                // while (quiz.questions[this.index] && quiz.questions[this.index].answers.length <= 1 && this.index < quiz.questions.length) {
                //     this.index++;
                // }//console.log(quiz);
                // if (this.index == quiz.questions.length - 1) {

                //     this.io.emit('question', []); return;
                // }
                // this.io.emit('quiz',quiz);
                while (quiz.questions[this.questionIndex].mediatype == 1 || quiz.questions[this.questionIndex].type != 1 && this.questionIndex < quiz.questions.length - 1) {
                    this.questionIndex++;
                }
                //console.log(quiz.questions[this.questionIndex]);
                console.log(quiz.questions.length);
                console.log(this.questionIndex);

                this.socketClient.emitQuestion(quiz.questions[this.questionIndex]);
                this.currentQuestion = quiz.questions[this.questionIndex];


                if (this.questionIndex == quiz.questions.length - 1) {
                    this.finished = true;
                    this.socketClient.emitGameEnd();console.log("Done");
                }

                this.questionIndex++;
            });
        });
    }

}