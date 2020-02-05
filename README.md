### Init new ptoject
npm init --yes

### Install express
npm install express


### To have autoupdate
npm install -g nodemon
res.send(req.params)
res.send(req.query); req.query on request string go after ?

for example http://localhost:3000/:year/:month

localhost:3000/api/posts/2018/1?sortBy=name
req.params = { year: 2018, month: 1 }
req.query = { sortBy: "name" }

#### 
404 error - object not find
4oo error - Bad Request

to test POST request we adding to body data we want to send and res.send new object

### add Joi data validation
npm inatall @hapi/joi

