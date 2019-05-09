//vain testaustarkoituksiin
const demo = require('./demo.js').state;
const uuid = require('uuid/v1');

const storage = {
    test: demo
}

//anna pelin tila
function getState(id){
    return storage[id];
}

//talleta pelin tila
function setState(id, state){
    if (storage[id]){
        storage[id] = state;
        return state;
    } else {
        return;
    }
}


//luo uusi peli ja anna sen id
function newGame(){
    const id = uuid();
    storage[id] = {};
    return id;
}


module.exports = {
    getState: getState,
    setState: setState,
    newGame: newGame
}