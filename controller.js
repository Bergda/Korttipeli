
function newDeck(){
    const suits = [
        { name: "hearts", symbol: "\u2665"},
        { name: "diamonds", symbol: "\u2666"},
        { name: "clubs", symbol: "\u2663"},
        { name: "spades", symbol: "\u2660"}
    ];
    
    const labels = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 2; j <= 14; j++) {
            deck.push({
                suit: suits[i],
                value: j,
                label: labels[j - 2]
            })
        }
    }
    return deck;
}

function initialize(){
    const state = {
        deck: newDeck(),
        score: {
            dealer: 0,
            player: 0
        },
        dealer: {
            cards: []
        },
        player: {
            cards: []
        },
        active: null,
        resolve: null
    }
    return state;
}   

function newDeal(state){
    const deck = newDeck()
    const state = {
        deck: deck,
        dealer: {
            cards: [nextCard(deck)]
        },
        player: {
            cards: [nextCard(deck)]
        },
        active: 'player',
        resolve: null
    }
    return state;
}

function nextCard(deck){
    const card = deck.splice(Math.floor(Math.random() * deck.length), 1)
    return card;
}

