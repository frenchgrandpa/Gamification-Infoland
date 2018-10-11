import { callbackify } from "util";

let axios = require('axios');
class answer
{
    id: string;
    text: string;
    constructor(id:string,text:string)
    {
        this.id = id;
        this.text = text;
    }
}
class question
{
    id:string;
    media: string;
    answers: Array<answer> = [];
    text: string;
    constructor(id: string,text:string)
    {
        this.id = id;
    }
    public add(ans: answer)
    {
        this.answers.push(ans);
    }
}
class quizObject
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
    private token: string;

    constructor(url: string){
        this.url = url;
    }

    public tokenRetrieval(username: string,password: string, cb: (err: boolean, token: string) => void)
    {
        axios.post(this.url+'/api/authenticate',{
            "username": username,
            "password": password
        })
        .then((response: any)=>
        {
            this.token = response.data;
            cb(false,this.token);
        })
        .catch((error:string)=>
        {
            cb(true,null);
            console.log(error);
        });
    }
    public quizRetrieval(learnID: string, cb:(quiz: quizObject) => void)
    {
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
                var quest = new question(questiondata[i].id,questiondata[i].questionBase);
                
                if (!questiondata[i].media || !questiondata[i].media.id) continue;//TEMPORARILY CHECK THIS
                quest.media = "https://pubquiz.iqualify.nl/api/media/"+questiondata[i].media.id+"/preview";
                for(let j = 0; j < answerdata.length; j++)
                {
                    
                    if (!answerdata[j] || !answerdata[j].id) continue;//TEMPORARILY CHECK THIS
                    //console.log(i+" , "+ j);
                    var ans = new answer(answerdata[j].id,answerdata[j].text)
                    quest.add(ans);
                    console.log(quest);
                }
                quiz.add(quest);
            }
            //console.log(quiz.questions);
            cb(quiz);
        })
        .catch((error:string)=>
        {
            console.log(error);
        });
    }
    public checkanswer(quizID : string,questionID:string,answerID: Array<string>)
    {
        //console.log(this.url+'/api/learnmaterial/'+quizID+'/update/'+questionID);
        var instance = axios.create({
            method: 'post',
            headers:{
                Authorization: 'Bearer '+this.token,
            }
        })
        instance.post(this.url+'/api/learnmaterial/'+quizID+'/update/'+questionID,{
            confirmed: true,
            answer:answerID,
            time:8,
        })
        .then((response: any)=>{
            //console.log(response);
        })
        .catch((error:string)=>{
            console.log(error);
        })
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

