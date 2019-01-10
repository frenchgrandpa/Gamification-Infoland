import { question } from "../api/infoland/infolandApi";
import Socket from "../sockets/socket";

export default abstract class Game<SocketType extends Socket> {

    public abstract maxPlayers: number;

    private questionIndex = 0;

    protected currentQuestion: question;
    public finished = false;
    
    protected socketClient: SocketType;
    protected constructor(socketClient: SocketType) {
        this.socketClient = socketClient;
    }

    protected updateCurrentQuestion(cb: (success: boolean) => void) {
        if (this.finished)
            return cb(false);
        global.infolandAPI.cookieRetrieval("beheerder","hotpotato", (err, token)=>{
            global.infolandAPI.tokenRetrieval("beheerder","hotpotato",'e09e2143-ef73-4351-b1f8-f3c10295f0e4', (err, token) => {
                global.infolandAPI.quizRetrieval('e09e2143-ef73-4351-b1f8-f3c10295f0e4', (quiz) => {
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