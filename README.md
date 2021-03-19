# The Dance

## Overview
The Dance is a collaborative card game for 2-5 players. 
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

Make sure to use incognito mode to create the second player. 

<p align="center"><img width=300 src="https://github.com/gjeuken/thedance/tree/master/images/lobby.png"></p>

## How to Play

First, let's define the _active_ and _inactive_ player. 
In a turn, a single player is _active_ and the rest of the players are _inactive_. 
In the below image, we showed the _active_ player's board on the left and _inactive_ player's board on the right. 
The _active_ player's name is written in bold & underlined, and has a light coloured background. 

<p align="center"><img src="https://github.com/gjeuken/thedance/tree/master/images/initial-active.png" width="300"/> <img src="https://github.com/gjeuken/thedance/tree/master/images/initial-inactive.png" width="300"/></p> 

The Dance is a collaborative card game. The goal is to obtain as small points as possible. The game starts with 98 points and the best score is 0 points. 

