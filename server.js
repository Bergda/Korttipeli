const express = require("express")
const app = express()
const http = require("http")
const port = 3000;
const cors = require('cors');
const baseUrl = '/api/v1';
const demo = require('./demo.js');
const db = require('./db.js');

app.use(cors());
app.use(express.json());

app.get("/game/:id", function (request, response) {
    console.log(request.params);
    const state = db.getState(request.params.id);

    if (state) {
    response.status(200).send(state);
    } else {
        response.status(404).send();
    }
});

app.post(baseUrl + '/game', (request, response) => {
    const newId = db.newGame();
    response.status(201).send({ id: newId });
});

app.post(baseUrl + '/game/:id', (request, response) => {
    const id = request.params.id;
    const action = request.body.action;

    switch(action){
        case 'hit':
            break;
        case 'stand':
            break;
        case 'play':
            break;
        case 'deal':
            break;
        default:
            response.status(400).send();
    }


    // //vain testaustarkoituksiin
    // const state = require('./demo.js').state;
    // if (db.setState(request.params.id, state)) {
    //     response.send(state);
    // } else {
    //     response.send(404).send();
    // }
});

app.listen(port, function () {
    console.log(`Server listening to port ${port}`)
});