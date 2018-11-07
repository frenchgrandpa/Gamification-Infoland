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

    private players: SocketIO.Client[];
    private playerWithBomb: SocketIO.Client;

    constructor(socketClient: Socket) {
        super();
        
        this.socketClient = socketClient;
        socketClient.getClients(clients => {
            this.players = clients;
            this.playerWithBomb = this.players[0];
            console.log(this);
        });

        this.startTime = Date.now();
        this.detonationTime = this.startTime + Math.round((Math.random() * 10 + 5) * 1000);

        this.setDetonationTimeout();
        this.addSocketEventHandlers();
        this.emitNextQuestion();
        setTimeout(() => this.onAnswer(0), 5000);
    }

    private getDetonationInterval() {
        return this.detonationTime - Date.now();
    }

    private setDetonationTimeout() {
        clearTimeout(this.detonationTimeout);
        this.detonationTimeout = setTimeout(() => {
            this.socketClient.emitBombExplosion();
        }, this.getDetonationInterval());
    }

    private addSocketEventHandlers() {
        this.socketClient.addAnswerEventHandler(this.onAnswer);
    }

    private onAnswer(data: any) {
        //global.infolandAPI.checkanswer("c0b63433-712e-4d35-9cd8-828073e6a84c", this.currentQuestion, [this.currentQuestion.answers[0]], null);//geen callback?¿??
        let correct = (data === 0) ? true : false;
        if (correct) {
            // this.addPointToPlayer();
            this.giveBombToNextPlayer();
        } else {
            this.detonationTime -= 5000;
            this.setDetonationTimeout();
        }

        this.emitNextQuestion();
    }

    private bombIndex = 0;
    private giveBombToNextPlayer() {
        if (this.bombIndex < this.players.length - 1)
            this.bombIndex++;
        else
            this.bombIndex = 0;
        this.playerWithBomb = this.players[this.bombIndex];
    }

    private questionIndex = 0;
    private currentQuestion: question;
    private emitNextQuestion() {
        global.infolandAPI.tokenRetrieval("heer", "test", (err, token) => {
            global.infolandAPI.quizRetrieval('c0b63433-712e-4d35-9cd8-828073e6a84c', (quiz) => {
                // while (quiz.questions[this.index] && quiz.questions[this.index].answers.length <= 1 && this.index < quiz.questions.length) {
                //     this.index++;
                // }//console.log(quiz);
                // if (this.index == quiz.questions.length - 1) {

                //     this.io.emit('question', []); return;
                // }
                // this.io.emit('quiz',quiz);
                while (quiz.questions[this.questionIndex].mediatype == 1 || quiz.questions[this.questionIndex].type != 1) {
                    this.questionIndex++;
                }
                //console.log(quiz.questions[this.questionIndex]);
                this.socketClient.emitQuestion(quiz.questions[this.questionIndex]);
                this.currentQuestion = quiz.questions[this.questionIndex];
            })
        });
    }

}