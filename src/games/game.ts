import { question, quizObject } from "../api/infoland/infolandApi";
import Socket from "../sockets/socket";

export default abstract class Game<SocketType extends Socket> {

    public abstract maxPlayers: number;

    private questionIndex = 0;

    protected currentQuestion: question;
    public finished = false;
    
    protected socketClient: SocketType;
    protected quizId: string;
    protected constructor(socketClient: SocketType, quizId: string) {
        this.socketClient = socketClient;
        this.quizId = quizId
    }

    protected updateCurrentQuestion(cb: (success: boolean) => void) {
        if (this.finished)
            return cb(false);
        global.infolandAPI.cookieRetrieval("beheerder","hotpotato", (err, token)=>{
            global.infolandAPI.tokenRetrieval("beheerder","hotpotato",this.quizId, (err, token) => {
                global.infolandAPI.quizRetrieval(this.quizId, (quiz) => {
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