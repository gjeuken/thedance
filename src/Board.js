import React from 'react';

export class TheDanceBoard extends React.Component {

	selectPile(card,pile) {
		this.props.moves.PlayCard(card,pile)
		this.played_card = []
	}

	selectCard(id) {
		this.props.moves.ResetLastPlayedPile()
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
			let cell = []
			if (this.props.G.last_played_pile === i) {
				cell = (
					<td className='card pile last_played' key={i} onDragOver={this.preventDefault()} onDrop={() => this.selectPile(this.played_card,i)}>
					{this.props.G.piles[i]}
					</td>
				);
			} else {
				cell = (
					<td className='card pile' key={i} onDragOver={this.preventDefault()} onDrop={() => this.selectPile(this.played_card,i)}>
					{this.props.G.piles[i]}
					</td>
				);
			};
			piles.push(<tc key={i}>{cell}</tc>);
		}

		if (this.props.G.deck.length > 0) {
		    //let deck = (<td className='card pile' key="5"> {this.props.G.deck.length} </td>);
            let deck = (<td className='card full-deck' key="5"> &nbsp; </td>);
            piles.push(<tc key="5">{deck}</tc>)
            indicators.push(<tc><td className='indicator'>{this.props.G.deck.length}</td></tc>);
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

		let player_names = [];
		for (let i = 0; i < this.props.ctx.numPlayers; i++) {
		    if (i === parseInt(this.props.ctx.currentPlayer, 10)) {
		        player_names.push(<tr className='active-player'>{this.props.matchData[i].name}</tr>);      // TODO Retrieve player names, instead of ids (i)
		    } else {
		        player_names.push(<tr className='inactive-player'>{this.props.matchData[i].name}</tr>);    // TODO Retrieve player names, instead of ids (i)
		    }
		}

		return (
		    <div id='main_window' className={isCurrentPlayer ? 'active-back' : 'inactive-back'}>
                <div id='sidebar'>
                    <table><tbody><td className='score-circle' key="score"> {this.props.G.score} pts </td></tbody></table>
                    <table id="player-table">
                        <tbody>{player_names}</tbody>
                    </table>
                </div>
                <div id='table'>
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
			</div>
		);
	}
}

