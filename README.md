# TIC TAC TOE

This is the 2nd project of the Main Javascript curriculum at [Microverse](https://www.microverse.org/) - @microverseinc

* The objective is to build a tic-tac-toe game on the browser where two human players can play against each other and the board is refreshed in between turns.
* The project was completed using Javascript language.

#### [Assignment link](https://www.theodinproject.com/courses/javascript/lessons/tic-tac-toe-javascript)

## 1. Project Link


## 2. Specifications

- Rules of the game.

1. The game accepts only integers from 1 to 9.
2. It starts on player X's turn.
```
=========TIC-TAC-TOE=========

Welcome to the TIC-TAC-TOE game!

The first player is 'Player X'

Choose numbers from 1 to 9 to select desired cell.

No duplicate numbers are allowed

-------------
|   |   |   |
-------------
|   |   |   |
-------------
|   |   |   |
-------------

Player X is the next to play! Make your move.
```
3. After player X pick his number, it's player O turn.
```
-------------
| X |   |   |
-------------
|   |   |   |
-------------
|   |   |   |
-------------

Player O is the next to play! Make your move.
```
4. The game ends when either someone win...

```
| X | O | O |
-------------
|   | X |   |
-------------
|   |   | X |
-------------

Player X won
==== GAME END ====
```
*The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.*

or it's draw.

```
-------------
| X | O | X |
-------------
| X | X | O |
-------------
| O | X | O |
-------------

It's a draw
==== GAME END ====
```