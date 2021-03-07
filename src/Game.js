import { INVALID_MOVE } from 'boardgame.io/core';

const createDeck = (start, end) => {
	const length = end - start + 1;
	const deck = Array.from({ length }, (_, i) => start + i);
	return deck.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value)
} // returns a shuffled deck

function DrawCard(G, ctx) {
    while (G.hand[ctx.currentPlayer].length < G.hand_size && G.deck.length > 0) {
        const card = G.deck.pop();
        G.hand[ctx.currentPlayer].push(card);
    }
}

function PlayCard(G, ctx, card, pile_id) {
    // TODO Check whether the card exist in hand or not. If not, invalid move.
    if (pile_id == 0 || pile_id == 1) { // If ascending pile
        if (card < G.piles[pile_id] && G.piles[pile_id]-card != 10) {
            return INVALID_MOVE;
        }
    } else { // If descending pile
        if (card > G.piles[pile_id] && card-G.piles[pile_id] != 10) {
            return INVALID_MOVE;
        }
    }
    G.piles[pile_id] = card;
    const card_idx = G.hand[ctx.currentPlayer].indexOf(card)
    G.hand[ctx.currentPlayer].splice(card_idx, 1)
}

export const TheDance = {
	setup: ctx => ({
		piles: [1,1,100,100], //Array(4).fill([1, 1, 100, 100]),
		deck: createDeck(2, 99),
		hand_size: 7,
		hand: Array(ctx.numPlayers).fill([]),
	}),
	moves: {DrawCard, PlayCard},
}
