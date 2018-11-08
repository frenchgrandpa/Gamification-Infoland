import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as http from 'http';

import API from './api/api';
import Socket from './socket';
import { InfolandAPI } from './api/infoland/infolandApi';
import HotPotato from './games/hotPotato';
import GameManager from './games/gameManager';

//process.env.NODE_ENV = "production";

//Initialize express
let app = express();
app.use(compression({ level: 9 }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'fsd8g74d89f7g89fd46v68fasd132fd5gfhdd7ngfd89',
    name: 'sessionid',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 },
    store: new session.MemoryStore()
}));
app.use('/static', express.static(__dirname + '/static', { maxAge: '3d' }));
app.use(bodyParser.json());
app.use(cookieParser());
app.disable('etag');

//Init pasport here, because if we'd created it in the account api the session would only be available there
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', new API().router);


let server = http.createServer(app);
global.infolandAPI = new InfolandAPI('https://pubquiz.iqualify.nl');
global.infolandAPI.tokenRetrieval('berk', 'test', (err, token) => {
    // if (err) return cb(err, null);
    // if (!token) return cb(false, null);
    // cb(null, token);
});


global.gameManager = new GameManager();
global.socket = new Socket(server);//this is only temporarily global,
//we'd really want to have a socket class assigned to each game seperately ,
//so that they can each have more specific event/emit handling
//And we'd have to move the socket class itself to an abstract level so that every game has its own socket class to handle its traffic

server.listen(3000);


app.get('*', (req, res) => {
    res.render('index');
});


//This HAS to be on the end of the file
app.get('*', (req, res) => res.status(404).send('Not found'));