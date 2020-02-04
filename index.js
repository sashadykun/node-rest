const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.get( '/api/courses/:year/:month', ( req, res ) => {
    res.send(req.params.id);
});

const port = process.env.PORT || 4000;
app.listen( port, () => console.log(`Listening on port ${port}... `) )

// app.post();
// app.put();
// app.delete();