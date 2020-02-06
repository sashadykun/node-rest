const config = require('config'); // to use config file with environmens
const morgan = require('morgan'); // to log HTTP reqeusts
const helmet = require('helmet'); // help secure apps by setting various HTTP headers.
const Joi = require('@hapi/joi');
const logger = require('./logger');
const bodyParser = require('body-parser')
const authenticate = require('./authenticate')
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //can add key: value in req.body
app.use(express.static('public')); // argument 'bublic' is folder name to serve it just call file name in browser
app.use(helmet()); 

//Configuration 'config' 
console.log('Application Name: ' + config.get('name'));
console.log('Application Name: ' + config.get('mail.host'));
console.log('Application Password ' + config.get('mail.password'));

if (app.get('env') === 'development') { //to use morgan logger only in development 
    app.use(morgan('tiny'));
    console.log('morgan enabled...')
}
 

app.use(logger);
app.use(authenticate);


const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get( '/api/courses/:year/:month', ( req, res ) => {
    res.send(req.params.id);
});

app.post( '/api/courses', (req, res) =>{
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.get( '/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`The course with the ID ${req.params.id} was not found`)
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`The course with the ID ${req.params.id} was not found`)
    

    //Validate
    //Ifinvalid, return 400 -Bad request
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);


    //Update couse
    course.name = req.body.name;
    //Return tehe updated course
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required(),
    })
    
    return schema.validate(course);
};

app.delete('/api/courses/:id', (req, res) => {
    //Look up the couse
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`The course with the ID ${req.params.id} was not found`);
      
    //Delete
    
    const index = courses.indexOf(course);
   
    courses.splice(index, 1);

    //Return the same course
    res.send(course);

});



const port = process.env.PORT || 4000;
app.listen( port, () => console.log(`Listening on port ${port}... `) )
