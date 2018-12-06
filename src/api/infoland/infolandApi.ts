import { callbackify } from "util";

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
    constructor(id = "no_id",text:string)
    {
        this.id = id
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
                    quest.type = 1;
                    for(let j = 0; j < answerdata.length; j++)
                    {
                        
                        if (!answerdata[j] || !answerdata[j].id) continue;//TEMPORARILY CHECK THIS
                        //console.log(i+" , "+ j);
                        var ans = new answer(answerdata[j].id,answerdata[j].text)
                        quest.add(ans);
                        //console.log(quest);
                    }
                }
                else if(questiondata[i].questionType == 6)
                {
                    quest.type = 6;
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
    
    public checkanswer(quizID : string,question:question,answerArray:answer[], cb: (isCorrect: boolean) => void)
    {
        let answerString: String|String[] = [];
        let type = question.type;
        let multiplechoice = 1;
        let numberanswer = 6
        switch (type)
        {
            case multiplechoice:
            {
                
                for (let answer of answerArray)
                {
                    answerString = answerString.concat(answer.id)
                }
                break;
            }
            case numberanswer:
            {
                for (let answer of answerArray)
                {
                    answerString = answer.text
                }
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
        console.log(JSON.stringify([this.url+'/api/learnmaterial/'+quizID+'/update/'+question.id,{
            confirmed: false,
            answer:answerString,
            time:69,
        }]));
        instance.post(this.url+'/api/learnmaterial/'+quizID+'/update/'+question.id,{
            confirmed: false,
            answer:answerString,
            time:69,
        })
        .then((response: any)=>{
            console.log(response.status);
        })
        .catch((error:string)=>{
           // console.log(error);
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

