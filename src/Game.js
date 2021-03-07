import { INVALID_MOVE } from 'boardgame.io/core';

function CreateDeck(start, end) {
	const length = end - start + 1;
	const deck = Array.from({ length }, (_, i) => start + i);
	return deck.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value)
} // returns a shuffled deck

function NumberOfCards(n_players) {
	if (n_players === 1) { return 8 }
	else if (n_players === 2) { return 7 }
	else { return 6 }
}

function DrawCard(G, ctx) {
    while (G.hand[ctx.currentPlayer].length < G.hand_size && G.deck.length > 0) {
        const card = G.deck.pop();
        G.hand[ctx.currentPlayer].push(card);
    }
}

function PlayCard(G, ctx, card, pile_id) {
    const card_idx = G.hand[ctx.currentPlayer].indexOf(card)

    if (card_idx === -1) { return INVALID_MOVE; } // Check if the player has the card

    if (pile_id === 0 || pile_id === 1) { // If ascending pile
        if (card < G.piles[pile_id] && G.piles[pile_id]-card !== 10) { return INVALID_MOVE; }
    } else { // If descending pile
        if (card > G.piles[pile_id] && card-G.piles[pile_id] !== 10) { return INVALID_MOVE; }
    }
    G.piles[pile_id] = card;
    G.hand[ctx.currentPlayer].splice(card_idx, 1)
}

function UpdateScore(G, ctx) {  // Not using anywhere yet. Not tested.
    var score = G.length
    var  n;
    for (n=0; n < ctx.numPlayers; n++) {
        score += G.hand[n].length
    }
    G.score = score
}

export const TheDance = {
	setup: ctx => {
		let deck = CreateDeck(2,99);
		let hand_size = NumberOfCards(ctx.numPlayers)
		let hand = Array(ctx.numPlayers).fill([]);
		for (let i = 0; i < ctx.numPlayers; i++) {
			hand[i] = deck.splice(0, hand_size);
	}
		return ({ piles: [1, 1, 100, 100],
		deck: deck,
		hand_size: hand_size,
		hand: hand,
		score: 98,})
	},

	phases: {
	    main_phase: {
	        moves: {DrawCard, PlayCard},
	        endIf: G => (G.deck.length === 0),
	        next: 'end_phase',
	        start: true,
	    },
	    end_phase: {
	        moves: {PlayCard},
	    },
	}
}
