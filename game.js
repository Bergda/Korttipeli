console.log("moi");

async function handleHit() {
    console.log("Hit");

    const state = await makeAction('hit')

    if (state.resolve) {
        gameOver(state.resolve);
    }
}

async function handleStand() {
    console.log('Stand');
    let state = await makeAction('stand');

    if (!state.resolve) {
        handlePlay();
    } else {
        gameOver(state.resolve);
    }
}
const handlePlay = async () => {
    let state = await makeAction('play');
    if (!state.resolve) {
        setTimeout(handlePlay, 1000)
    } else {
        gameOver(state.resolve);
    }
};
const gameOver = (resolve) => {
    document.querySelector('#overlay').style.visibility = 'visible';
    document.querySelector('#gameover p').textContents = resolve.message;
}
async function makeAction(action) {
    const protocol = 'http://';
    const host = 'polar-temple-58359.herokuapp.com';
    const path = '/api/v1/game/';
    const gameId = 'test';

    const url = protocol + host + path + gameId;
    console.log(url);

    const reqData = {
        action: action
    }
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
    });

        const respData = await response.json();

    console.log(action);
    render(respData);
    return respData;

}

function render(state) {
    console.log(state);

    const dealerHand = document.getElementById('dealer-hand')
    dealerHand.innerHtml = '';

    for (let i = 0; i < state.dealer.cards.length; i++) {
        dealerHand.appendChild(createCard(state.dealer.cards[i]))
    }

    dealerHand.appendChild(createCard(state.dealer.cards[0]))

    const playerHand = document.getElementById('player-hand')
    playerHand.innerHtml = '';

    state.player.cards.forEach(element => {
        playerHand.appendChild(createCard());
    });

    playerHand.appendChild(createCard(state.dealer.cards[0]))
}


function createCard(card) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');

    return newCard;
}

function addCard(container) {
    container.appendChild(createCard(card));

}

document.getElementById('hit').onclick = handleHit;
document.getElementById('stand').addEventListener('click', handleStand);
document.querySelector('#gameover button').onclick = () => {
    document.getElementById('overlay').style.visibility = 'Hidden';
    makeAction('deal');
};

makeAction('deal');