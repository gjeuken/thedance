const createDeck = (start, end) => {
	const length = end - start + 1;
	const deck = Array.from({ length }, (_, i) => start + i);
	return deck.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value)
} // retuns a shuffled deck

export const TheDance = {
	setup: () => ({
		piles: Array(4).fill(null),
		deck: createDeck(2,99)
	})
}
