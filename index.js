const debug = require('debug')('app:startup'); // use for debugging with console logs
const config = require('config'); // to use config file with environmens
const morgan = require('morgan'); // to log HTTP reqeusts
const helmet = require('helmet'); // help secure apps by setting various HTTP headers.
const logger = require('./logger');
const courses = require('./routes/courses');
const bodyParser = require('body-parser')
const authenticate = require('./authenticate')
const express = require('express');
const app = express();

app.set('view engine', 'pug');
// app.set('views', './views'):

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //can add key: value in req.body
app.use(express.static('public')); // argument 'bublic' is folder name to serve it just call file name in browser
app.use(helmet());
app.use('/api/courses', courses); //with any routes /api/courses use courses routes

//Configuration 'config' 
console.log('Application Name: ' + config.get('name'));
console.log('Application Name: ' + config.get('mail.host'));
// console.log('Application Password ' + config.get('mail.password'));

if (app.get('env') === 'development') { //to use morgan logger only in development 
    app.use(morgan('tiny'));
    debug('morgan enabled...')
}
 
app.use(logger);
app.use(authenticate);

app.get('/', (req, res) => {
    res.render('index', {title: 'API express app', message: 'connected'})
});

const port = process.env.PORT || 4000;
app.listen( port, () => console.log(`Listening on port ${port}... `) )
