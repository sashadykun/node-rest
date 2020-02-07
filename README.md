### Init new project
`npm init --yes`

### Install express
`npm install express`


### To have autoupdate
`npm install -g nodemon`
`res.send(req.params)`
`res.send(req.query);` req.query on request string go after ?

for example http://localhost:3000/:year/:month

`localhost:3000/api/posts/2018/1?sortBy=name`
`req.params = { year: 2018, month: 1 }`
`req.query = { sortBy: "name" }`

#### 
404 error - object not find
4oo error - Bad Request

to test POST request we adding to body data we want to send and res.send new object

### add Joi data validation
`npm inatall @hapi/joi`

express.urlencoded()
 - build in method to use key=value&key=value in req.body 
so we can use url encoded method 

or we can use body-parser library 
`npm install body-parser`
`bodyParser.urlencoded({ extended: false })`

middleware for static files
`app.use(express.static())`;

### to fing what  environment you are on 
console.log( `NODE_ENV: ${process.env.NODE_ENV}`);
or 
`app.get('env')` - by default it set to `'development'`

### to set environment 
on cli execute command `export NODE_ENV=development` or `export NODE_ENV=production`

### to create custom environment variables list
store it in `custom-environment-variables` where you make you the mapping of an environment variable


### to get debugging messages on console
`npm install debug`
debug usage 
`const debug = require('debug')('spase:to:debug')`
we can set environment variables with `DEBUG` key word = `'spase:to:debug'` or wildcard `*` or different namespacess with coma `,`
and we can set envirenment variable at start point of server
as 
`DEBUG=app* nodemon index.js`

### templating engines - generates dynamic HTML and returning to the client
- Pug
- Mustache
- EJS

`npm install pug`
to use it `app.set('view engine', 'pug');`
and set route to templates `app.set('views', './views');` will be set by default