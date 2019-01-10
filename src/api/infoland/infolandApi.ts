import { callbackify } from "util";
import { stringify } from "querystring";

let axios = require('axios');
export enum mediatype
{
    foto = 0,
    video = 1
}
export class answer
{
    id: string;
    text: string;
    correct: boolean;
    constructor(id = "no_id",text:string,correct:boolean)
    {
        this.correct = correct;
        this.id = id;
        this.text = text;
    }

    public setID(id:string)
    {
        this.id = id;
    }

}
export class question
{
    id:string;
    media: string;
    mediatype: Number
    answers: Array<answer> = [];
    text: string;
    type: Number;
    correctanswers: Number;

    constructor(id: string,text:string,type:Number)
    {
        this.id = id;
        this.text = text
        this.type = type
    }
    public add(ans: answer)
    {
        this.answers.push(ans);
    }
    public setMedia(media:string, type:Number)
    {
        this.media = media;
        this.mediatype = type;
    }

    public setNumAns(number: Number)
    {
        this.correctanswers = number;
    }
}
export class quizObject
{
    id: string;
    questions: Array<question> = [];
    title: string;
    constructor(id: string,title:string)
    {
        this.id = id;
        this.title = title;
    }
    public add(quest:question)
    {
        this.questions.push(quest);
    }
}

export class InfolandAPI
{
    private url: string;
    private cookie: string;
    private token: string;

    constructor(url: string){
        this.url = url;
    }
    public cookieRetrieval(username: string,password: string ,cb: (err: boolean, token: string) => void)
    {
        username = "beheerder";
        password = "hotpotato";
        axios.post(this.url+'/admin/authentication/logon',{
            "username": username,
            "password": password,
        }).then((response: any)=>{
            this.cookie = response.headers['set-cookie'][1];
            cb(false,null);

        }).catch((error:string)=>
        {
            cb(true,null);
            console.log(error);
        });
    }
    
    public tokenRetrieval(username: string,password: string,learnID: string, cb: (err: boolean, token: string) => void)
    {
        //console.log(this.cookie);
        username = "beheerder";
        password = "hotpotato";
        axios.get(this.url+'/api/preview/quiz/'+learnID,{
            headers:{
                "Cookie": this.cookie,
            }
        })
        .then((response: any)=>
        {
            //console.log(response);
            let tokenlocation:string = response.request.res.responseUrl;
            tokenlocation = JSON.stringify(tokenlocation.substring(34));
            //console.log(tokenlocation);
            axios.post(this.url+'/api/authenticate/token',tokenlocation,{
                responseType: 'json',

                headers:{
                    "Cookie": this.cookie,
                    'Content-Type': 'application/json',
                },
            })  
            .then((response: any)=>{
                this.token = response.data;
                //console.log(response);
                cb(false,this.token);
            })
            .catch((error:string)=>{
                console.log(error);
                cb(true,null);
            })
        }) 
        .catch((error:string)=>
        {
            cb(true,null);
            //console.log(error);
        });
    }

    public concatquiz(quiz:quizObject,amount:number)
    {
        for(let i = 0; i<amount;i++)
        {
            quiz.questions = quiz.questions.concat(quiz.questions);
        }
        return quiz;
    }

    public quizRetrieval(learnID: string, cb:(quiz: quizObject) => void)
    {
        //console.log(this.token);
        axios.get(this.url+'/api/learnmaterial/'+learnID,{
            headers: {
                Authorization: 'Bearer '+this.token,
                 
            }
        })
        .then((response: any)=>
        {
            //console.log(response.data.pages);
            let questiondata = response.data.pages
            let quiz = new quizObject(response.data.id,response.data.title);
            var i:number;
            var j:number;
            for(i = 0; i<Object.keys(questiondata).length;i++){
                var answerdata = questiondata[i].answers;
                var quest = new question(questiondata[i].id,questiondata[i].questionBase,questiondata[i].questionType);

                if (questiondata[i].media)
                {   
                    if(questiondata[i].media.type == mediatype.foto)
                    {   
                        let mediaurl = this.url+"/api/media/"+questiondata[i].media.id+"/preview";
                        quest.setMedia(mediaurl,0);
                       
                    }
                    else if(questiondata[i].media.type == mediatype.video)
                    {
                        let mediaurl = this.url+"/api/media/"+questiondata[i].media.id;
                        quest.setMedia(mediaurl,1);
                    }  
                    
                }
               

                if(questiondata[i].questionType == 1)
                {
                    let correctanswers = questiondata[i].correctAnswers;
                    if(correctanswers>1)
                    {
                        quest.setNumAns(correctanswers);
                    }
                    else
                    {
                        quest.setNumAns(1);
                    }
                    quest.type = 1;
                    for(let j = 0; j < answerdata.length; j++)
                    {
                        
                        if (!answerdata[j] || !answerdata[j].id) continue;//TEMPORARILY CHECK THIS
                        var ans = new answer(answerdata[j].id,answerdata[j].text,answerdata[j].correct)
                        quest.add(ans);
                    }
                }
                else if(questiondata[i].questionType == 6)
                {
                    quest.type = 6;
                }
                quiz.add(quest);
            }
            quiz = this.concatquiz(quiz,2);
            cb(quiz);
        })
        .catch((error:string)=>
        {
            console.log(error);
        });
    }
    private checkduplicates(answerArray: String[])
    {
        var i : number;
        var j : number;
        for(i = 0 ; i< answerArray.length; i++)
        {
            for(j = 0; j< answerArray.length; j++)
            {
                if(i != j)
                {
                    if(answerArray[i] === answerArray[j])
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public checkanswer(quizID : string,question:question,answerArray:String[], cb: (isCorrect: boolean,amount:number) => void)
    {
        let answerString: String|String[] = [];
        let type = question.type;
        let multiplechoice = 1;
        let numberanswer = 6
        switch (type)
        {
            case multiplechoice:
            {
                answerString = answerArray

                break;
            }
            default:
            {
                answerString = "";
            }
        }

        
        var instance = axios.create({
            method: 'post',
            headers:{
                Authorization: 'Bearer '+this.token,
            }
        });

        if(this.checkduplicates(answerArray))
        {
            cb(false,0);
        }
        instance.post(this.url+'/api/learnmaterial/'+quizID+'/update/'+question.id,{
            confirmed: true,
            answer:answerString,
            time:69,
        })
        .then((response: any)=>{
            let answers = response.data.question.answers;
            let correctanswers: String|String [] = [];
            for(let answer of answers)
            {

                if(answer.correct === true)
                {
                    correctanswers.push(answer.id);
                }
            }
            let correctamount = 0;
            for(let answer of answerArray)
            {
                let correct = false;
                for(let correctanswer of correctanswers)
                {
                    if (answer === correctanswer)
                    {
                        console.log("correct answer");
                        correct = true;
                        correctamount++;
                    }
                }
            }
            if(correctamount!=correctanswers.length)
            {
                console.log("wrong answer");
                cb(false,correctamount);
                return;
            }
            cb(true,correctanswers.length);
            return;
        })
        .catch((error:string)=>{
           //console.log(error);
        })
        //cb(false);
    } 

    public resetQuiz(quizID: string)
    {
        var instance = axios.create({
            method: 'post',
            headers:{
                Authorization: 'Bearer '+this.token,
            }
        })
        instance.post(this.url+'/api/learnmaterial/'+quizID+'/retake',{
            
        })
        .then((response: any)=>{
            console.log(response);
        })
        .catch((error:string)=>{
            console.log(error);
        })
    }
}
//let test = new InfolandAPI('https://pubquiz.iqualify.nl');
//test.tokenRetrieval('heer','test',(error,token)=>{test.quizRetrieval('c0b63433-712e-4d35-9cd8-828073e6a84c')});
//test.tokenRetrieval('heer','test',(error,token)=>{test.resetQuiz('c0b63433-712e-4d35-9cd8-828073e6a84c')});

