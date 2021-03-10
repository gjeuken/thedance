import React from 'react';

export class TheDanceBoard extends React.Component {

	selectPile(card,pile) {
		this.props.moves.PlayCard(card,pile)
		this.played_card = []
	}

	selectCard(id) {
		this.played_card = this.props.G.hand[this.props.playerID][id]
	}
	preventDefault = () => (event) => {
    	event.preventDefault();
    	console.log("prevent default")
 	}

	render() {

		let isCurrentPlayer = this.props.ctx.currentPlayer === this.props.playerID;

		let indicators = [];
		indicators.push(<tc><td className='indicator'>&#9650;</td></tc>);
		indicators.push(<tc><td className='indicator'>&#9650;</td></tc>);
		indicators.push(<tc><td className='indicator'>&#9660;</td></tc>);
		indicators.push(<tc><td className='indicator'>&#9660;</td></tc>);
		
		let piles = [];
		for (let i = 0; i < 4; i++) {
			let cell = (
				<td className='card pile' key={i} onDragOver={this.preventDefault()} onDrop={() => this.selectPile(this.played_card,i)}>
				{this.props.G.piles[i]}
				</td>
			);
			piles.push(<tc key={i}>{cell}</tc>);
		}

		let board_table = [];
		board_table.push(<tr id='indicators'>{indicators}</tr>);
		board_table.push(<tr id='pilerack'>{piles}</tr>);

		let player_hand = [];
		for (let i = 0; i < this.props.G.hand[this.props.playerID].length; i++) {
			let cell = (
				<td className='card hand' draggable key={i} onDragStart={() => this.selectCard(i)}>
				{this.props.G.hand[this.props.playerID][i]}
				</td>
			);
			player_hand.push(<tc  key={i}>{cell}</tc>);
		}

		return (
			<div id='table' className={isCurrentPlayer ? 'active-back' : 'inactive-back'}>
				<table id="board">
					<tbody>{board_table}</tbody>
				</table>
				<table id="player_hand">
					<tbody id='handrack'>{player_hand}</tbody>
				</table>
				<div id='pass_container'>
					<button className='pass' onClick={() => this.props.moves.EndTurn()}>pass</button>
				</div>
			</div>
		);
	}
}

