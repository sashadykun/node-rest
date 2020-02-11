const Joi = require('@hapi/joi');
const express = require('express');
const routes = express.Router();


const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

routes.get('/', (req, res) => {
    res.send(courses);
});

routes.get( '/:year/:month', ( req, res ) => {
    res.send(req.params.id);
});

routes.post( '/', (req, res) =>{
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

routes.get( '/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`The course with the ID ${req.params.id} was not found`)
    res.send(course);
});

routes.put('/:id', (req, res) => {
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

routes.delete('/:id', (req, res) => {
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

module.exports = routes;