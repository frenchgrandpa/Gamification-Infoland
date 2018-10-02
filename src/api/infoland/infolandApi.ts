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
    url: string;
    token: string;

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
    public quizRetrieval(learnID: string,token: string = this.token)
    {
        axios.get(this.url+'/api/learnmaterial/'+learnID,{
            headers: {
                Authorization: 'Bearer '+this.token, 
            }
        })
        .then((response: any)=>
        {
            let questiondata = response.data.pages
            let quiz = new quizObject(response.data.id,response.data.title);
            var i:number;
            var j:number;
            for(i = 0; i<Object.keys(questiondata).length;i++){
                var answerdata = questiondata[i].answers;
                var quest = new question(questiondata[i].id,questiondata[i].questionBase);
                quest.media = questiondata[i].media.id;
                //console.log(answerdata);
                for(j = 0; j<Object.keys(answerdata).length;j++)
                {
                    //console.log(i+" , "+ j);
                    var ans = new answer(answerdata[j].id,answerdata[j].text)
                    quest.add(ans);
                }
                quiz.add(quest);
            }
            //console.log(quiz.questions);

        })
        .catch((error:string)=>
        {
            console.log(error);
        });
    }
    public checkanswer(quizID : string,questionID:string,answerID: string)
    {
        console.log(this.url+'/api/learnmaterial/'+quizID+'/update/'+questionID);
        axios.post(this.url+'/api/learnmaterial/'+quizID+'/update/'+questionID,{
            headers:{
                Authorization: 'Bearer '+this.token,
            },
            confirmed: true,
            answer:{answerID},
            time:0,
        })
        .then((response: any)=>{
            //console.log(response);
        })
        .catch((error:string)=>{
            console.log(error);
        })
        
    }
}
let test = new InfolandAPI('https://pubquiz.iqualify.nl');
test.tokenRetrieval('heer','test',(error,token)=>{test.quizRetrieval('e5e7e82f-44e3-4e6d-86cf-b8fd2f9d07f2')});
//setTimeout(function(){test.checkanswer("e5e7e82f-44e3-4e6d-86cf-b8fd2f9d07f2","68296ce1-6f88-435e-9c03-d1e247d6d4c2","341b191d-39c9-4fd4-b54b-a10944ab880c")},1000);

