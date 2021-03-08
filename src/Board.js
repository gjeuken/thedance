import React from 'react';

export class TheDanceBoard extends React.Component {

	selectPile(card,pile) {
		this.props.moves.PlayCard(card,pile)
		this.played_card = []
	}

	selectCard(id) {
		this.played_card = this.props.G.hand[this.props.ctx.currentPlayer][id]
	}

	render() {

		let piles = [];
		for (let i = 0; i < 4; i++) {
			let cells = [];
			cells.push(
				<td className='card pile' key={i} onClick={() => this.selectPile(this.played_card,i)}>
				{this.props.G.piles[i]}
				</td>
			);
			piles.push(<tc key={i}>{cells}</tc>);
		}

		let player_hand = [];
		for (let i = 0; i < this.props.G.hand[this.props.ctx.currentPlayer].length; i++) {
			let cells = [];
			cells.push(
				<td className='card hand' key={i} onClick={() => this.selectCard(i)}>
				{this.props.G.hand[this.props.ctx.currentPlayer][i]}
				</td>
			);
			player_hand.push(<tc  key={i}>{cells}</tc>);
		}

		return (
			<div id='table'>
				<table id="board">
					<tbody className='pilerack'>{piles}</tbody>
				</table>
				<table id="player_hand">
					<tbody className='handrack'>{player_hand}</tbody>
				</table>
				<div id='pass_container'>
					<button className='pass' onClick={this.props.moves.EndTurn}>pass</button>
				</div>
			</div>
		);
	}
}

