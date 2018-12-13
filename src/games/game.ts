import { question } from "../api/infoland/infolandApi";
import Socket from "../sockets/socket";

export interface IGame {}

export default abstract class Game<SocketType extends Socket> implements IGame {

    public abstract maxPlayers: number;

    private questionIndex = 0;

    protected currentQuestion: question;
    protected finished = false;
    
    protected socketClient: SocketType;
    protected constructor(socketClient: SocketType) {
        this.socketClient = socketClient;
    }

    protected updateCurrentQuestion(cb: (success: boolean) => void) {
        if (this.finished)
            return cb(false);
        global.infolandAPI.cookieRetrieval("heer","test", (err, token)=>{
            global.infolandAPI.tokenRetrieval("heer", "test",'c0b63433-712e-4d35-9cd8-828073e6a84c', (err, token) => {
                global.infolandAPI.quizRetrieval('c0b63433-712e-4d35-9cd8-828073e6a84c', (quiz) => {
                    while (quiz.questions[this.questionIndex].mediatype == 1 || quiz.questions[this.questionIndex].type != 1 && this.questionIndex < quiz.questions.length - 1) {
                        this.questionIndex++;
                    }

                    if (this.questionIndex == quiz.questions.length - 1) {
                        return cb(false);
                    }
                    
                    this.currentQuestion = quiz.questions[this.questionIndex];
                    this.questionIndex++;

                    return cb(true);
                });
            });
        });
    }

    protected emitNextQuestion() {
        this.updateCurrentQuestion((success) => {
            if (success)
                this.socketClient.emitQuestion(this.currentQuestion);
            else
                this.socketClient.emitGameEnd();
        });
    }

}