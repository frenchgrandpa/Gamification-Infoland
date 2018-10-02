let axios = require('axios');
class question
{

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
        .then((response: string)=>
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
        .then((response: string)=>
        {
            console.log(response.data.pages);
        })
        .catch((error:string)=>
        {
            console.log(error);
        });
    }
}
let test = new InfolandAPI('https://pubquiz.iqualify.nl');
test.tokenRetrieval('heer','test',(error,token)=>{test.quizRetrieval('e5e7e82f-44e3-4e6d-86cf-b8fd2f9d07f2')});

