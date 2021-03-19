# The Dance

## Overview
The Dance is a collaborative card game for 2 to 5 players. 
This repository contains the code for the game available at [thedance.herokuapp.com](thedance.herokuapp.com). 
The implementation is based on the open source game engine [BoardGame.io](https://boardgame.io/). 

## How to Run

Install required packages:

```installation
npm install
```

Start the server:

```server
npm run serve
```

Start the game:

```start
npm start 
```

After above steps, the game lobby will be available at _localhost:3000_. 

_Make sure to use incognito mode to create the second player._ 

<p align="center"><img width=300 src="https://github.com/gjeuken/thedance/blob/master/images/lobby.png"></p>

## How to Play

The Dance is a **collaborative** card game, played with 2 to 5 players. 

The goal is to obtain as small points as possible. The game starts with 98 points and the best score is 0 point. 

First, let's define the **active** and **inactive** players. 
In a turn, a single player is active and the rest of the players are inactive. 
In the below image, we showed the active player's board on the left and inactive player's board on the right. 
The active player's name is written in bold and underlined. The active player's board has light colored background. 

<p align="center"><img src="https://github.com/gjeuken/thedance/blob/master/images/initial-active.png" width="350"/> 
&nbsp;&nbsp; <img src="https://github.com/gjeuken/thedance/blob/master/images/initial-inactive.png" width="350"/></p> 

The game starts with a deck of 98 cards (from 2 to 99). 
In a two player game, each player has a hand of 7 cards and the remaining 84 cards are put face down on the board. 

There are four piles on the board, which have the initial cards [1, 1, 100, 100]. 
The red arrows above each pile show whether that pile is in ascending (&#9650;) or descending (&#9660;) order. 

At the beginning of the game, all players check their hands and decide who should be the starting player. 
The players before the starting player should pass their rounds without playing any card. 

The active player must play **at least 2** cards to the piles. 
A card can be played on a pile if it respects the corresponding ascending or descending order. 
There is one **exception** to this situation; if a card is **exactly 10** values away from the number on the pile, 
it can be played regardless of the order. 

An example is shown below. The active player can play cards 73, 76, 79, 85 or 87 to the first pile by respecting the ascending order.
Or, the player can first play 61 to the first pile, since it is 10 away from the number on the pile. 
Similarly, the active player can play 73 to the last pile. 

<p align="center"><img width=300 src="https://github.com/gjeuken/thedance/blob/master/images/ingame.png"></p>

After the active player plays at least 2 cards, they pass the turn and draw cards from the deck until they reach the hand limit. 

Once there are no cards in the deck, the game enters the **final phase**. 
In the final phase, the active player must play **at least one** card. 
If a player has no card in their hand, they are out of the game. 
The rest of the players keep playing until a player fails to add a card to one of the piles. 

The **final score** is the total number of cards which are not in play (the cards still in the players' hands and the cards in the deck). 

The Dance is enjoyable with the discussions within the group. 
The players should discuss their hands and try to agree on what should be played without seeing each others' hands. 
A player can say they "_have a good card to play in third pile_", but cannot say exactly which card they are planning to play. 
No card numbers should be discussed.

Enjoy the game! :)
