require("dotenv").config()
const express = require("express")
const app = express()
const apiRouter = require('./api')
const client = require('./db/client')

client.connect();

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.json());

app.use('/api', apiRouter);

// Setup your Middleware and API Router here

app.get('*', (req, res) => {
    res.status(404).send({
        error: "404 - not found",
        message: "No route found for the requested URL"
    });
});

app.use((error, req, res, _) => {
    res.send({error: error.name , name: error.name, message: error.message})
})

module.exports = app;
