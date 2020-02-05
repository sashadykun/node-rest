const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json()); 

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
    console.log ('result validation', error);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    } 
    // else if (req.body.name.length < 3 ) {
    //     res.status(400).send('Name should be minimun 3 characters.');
    //     return;
    // } 
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.get( '/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`The course with the ID ${req.params.id} was not found`)
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`The course with the ID ${req.params.id} was not found`)
    

    //Validate
    //Ifinvalid, return 400 -Bad request
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    } 

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
    if (!course) {
        res.status(404).send(`The course with the ID ${req.params.id} was not found`);
        return;
    }
    console.log('course', course)
    //Delete
    
    const index = courses.indexOf(course);
    console.log('index', index);
    courses.splice(index, 1);

    //Return the same course
    res.send(course);

});



const port = process.env.PORT || 4000;
app.listen( port, () => console.log(`Listening on port ${port}... `) )

// app.post();
// app.put();
// app.delete();