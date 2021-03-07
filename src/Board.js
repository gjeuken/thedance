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

		const cellStyle = {
			border: '1px solid #555',
			width: '50px',
			height: '100px',
			lineHeight: '50px',
			textAlign: 'center',
		};

		let piles = [];
		for (let i = 0; i < 4; i++) {
			let cells = [];
			cells.push(
				<td style={cellStyle} key={i} onClick={() => this.selectPile(this.played_card,i)}>
				{this.props.G.piles[i]}
				</td>
			);
			piles.push(<tc key={i}>{cells}</tc>);
		}

		let player_hand = [];
		for (let i = 0; i < this.props.G.hand[this.props.ctx.currentPlayer].length; i++) {
			let cells = [];
			cells.push(
				<td style={cellStyle} key={i} onClick={() => this.selectCard(i)}>
				{this.props.G.hand[this.props.ctx.currentPlayer][i]}
				</td>
			);
			player_hand.push(<tc key={i}>{cells}</tc>);
		}

		return (
			<div>
			board
			<table id="board">
			<tbody>{piles}</tbody>
			</table>
			hand
			<table id="player_hand">
			<tbody>{player_hand}</tbody>
			</table>
			<button onClick={this.props.moves.EndTurn}>
			pass
			</button>
			</div>
		);
	}
}

