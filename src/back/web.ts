import * as express from 'express';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import * as socketio from 'socket.io';

//Initialize redis
/*let redis = rds.createClient(6379, "steamtrade.q93ahm.0001.euw1.cache.amazonaws.com");
redis.on('connect', () => util.log("Client connected to redis"));
redis.on('error', (err) => redisError(err));

function redisError(err: any): void {
    util.log('Redis error: ' + err);
    redis.quit();
    redis = rds.createClient(6379, "steamtrade.q93ahm.0001.euw1.cache.amazonaws.com");
}*/


//Initialize passport
/*passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(new SteamStrategy({
    returnURL: 'http://34.248.133.170/auth/steam/return',
    realm: 'http://34.248.133.170/',
    apiKey: 'C61314DB6C3EEE693D22AE3F24DF61F1'
}, (identifier: any, profile: any, done: any) => {
    process.nextTick(() => {
        profile.identifier = identifier;
        return done(null, profile);
    });
}));*/


//Initialize express
let app = express();
app.use(compression({ level: 9 }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static('static', { maxAge: '3d' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.disable('etag');


//Initialize websockets
let server = http.createServer(app);
let io = socketio(server);
let socket = server.listen(3000);

io.on('connection', (client) => {
    client.on('auth', (event: string) => {
        console.log('hello');
    });
});


app.get('/', (req, res) => {
    res.redirect('https://www.youtube.com/watch?v=KIXxcjNANUA');
    //res.render('index');
    /*res.send(`<script src="static/socket.io.js"></script>
    <script>
        var socket = io.connect('/');
        socket.on('connect', function () {
            console.log('Client has connected to the server!');
            socketisauth = false;
        });
        socket.on('auth', (data) => {
            console.log(data);
        });
    </script>`);*/
});

//This HAS to be on the end of the file
app.get('*', (req, res) => res.status(404).send('Not found'));