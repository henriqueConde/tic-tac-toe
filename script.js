const INITIAL_STATE = {
    turn: 0,
    x: {
        fieldPositions: [],
    },
    o: {
        fieldPositions: [],
    },
    isGameOver: false,
    winner: undefined,
    isDraw: false,
    maxPlays: 9,
}

const MAX_PLAYS = 9;

const WINNING_POSITIONS = [
    [1,2,3],
    [1,4,7],
    [1,5,9],
    [2,5,8],
    [3,5,7],
    [3,6,9],
    [4,5,6],
    [7,8,9]
];

const TEXTS = {
    playerX: 'dracula',
    playerO: 'van helsing',
    draw: 'It\'s a draw',
    winner: 'The winner is: ',
    ticTacToe: 'Tic Tac Toe',
    playAgain: 'Play Again',
};

const MAIN = document.querySelector('#main');

const makeObjDeepCopy = obj => {
    return JSON.parse(JSON.stringify(obj));
}

class TicTacToe {
    state = makeObjDeepCopy(INITIAL_STATE);

    constructor() {
        this.resetGame = this.resetGame.bind(this);
        this.makeMove = this.makeMove.bind(this);
        this.renderMainTitle();
        this.createBoard();
    }

    createEl(tag, attrObj = {}, eventsObj = {}) {
        const el = document.createElement(tag);

        Object.entries(attrObj).forEach(([attr, value]) => {
            el[attr] = value;
        })

        Object.entries(eventsObj).forEach(([eventType, func]) => {
            el.addEventListener(eventType, func);
        })

        return el;
    }

    renderMainTitle() {
        const header = this.createEl('header');
        const headerTitle = this.createEl('h1', {
            className: 'header-title', 
            textContent: TEXTS.ticTacToe
        });

        header.appendChild(headerTitle);
        MAIN.appendChild(header);
    }

    createBoard() {
        const board = this.createEl('main', {
            className: 'board'
        });

        for (let i = 1; i < 10; i++) {
            const boardField = this.createEl('div', {
                className: `field field--${i}`,
            });
            boardField.dataset.fieldNumber = i;
            board.appendChild(boardField);

            const fieldButton = this.createEl('button',  {
                className: `field__button field__button--${i}`
            },{
                click: this.makeMove,
            });
            boardField.appendChild(fieldButton);
        }

        MAIN.appendChild(board);
    }

    makeMove({ target }) {
        const { parentNode: field } = target;
        if (!this.state.isGameOver) {
            this.printPlayerInBoard(field);
            this.registerPlayerFieldPosition(field.dataset.fieldNumber);
            this.changeTurn();
            this.removeEmptyCellButton(field.dataset.fieldNumber);
            this.checkIfGameIsOver();
        }
    }

    changeTurn() {
        if (this.state.turn === 0) {
            this.state.turn++;
        } else {
            this.state.turn--;
        }
    }

    registerPlayerFieldPosition(fieldNumber) {
        if (this.state.turn === 0) {
            this.state.x.fieldPositions.push(fieldNumber);
        } else {
            this.state.o.fieldPositions.push(fieldNumber);
        }
    }

    renderPlayAgainButton() {
        const playAgainButton = this.createEl('button', {
            className: 'status__button',
            textContent: TEXTS.playAgain
        }, {
            click: this.resetGame,
        });
        const statusContainer = document.querySelector('.status');
        statusContainer.appendChild(playAgainButton);
    }

    removeEmptyCellButton(fieldNumber) {
        const buttonField = document.querySelector(`.field__button--${fieldNumber}`);
        buttonField.remove();
    }

    getCorrectImageSrc() {
        if (this.state.turn === 0) {
            return 'assets/dracula.png';
        } else {
            return 'assets/van-helsing.png';
        }
    }

    printPlayerInBoard(field) {
        const playerImage = this.createEl('img', {
            className: 'field__img',
            alt: 'player-image',
            src: this.getCorrectImageSrc(),
        });
        field.appendChild(playerImage);
    }

    checkForWinner() {
        WINNING_POSITIONS.forEach(winArray => {
            const xContainsWinPosition = winArray.every(element => {
                return this.state.x.fieldPositions.includes(element.toString());
            });
            if (xContainsWinPosition) {
                this.state.isGameOver = true;
                this.state.winner = TEXTS.playerX;
                this.printGameStatus();
                this.renderPlayAgainButton();
                return;
            }

            const oContainsWinPosition = winArray.every(element => {
                return this.state.o.fieldPositions.includes(element.toString());
            });
            if (oContainsWinPosition) {
                this.state.isGameOver = true;
                this.state.winner = TEXTS.playerO;
                this.printGameStatus();
                this.renderPlayAgainButton();
                return;
            }
        })
    }

    checkForDraw() {
        const xPlaysLength = this.state.x.fieldPositions.length;
        const oPlaysLength = this.state.o.fieldPositions.length;
        const allPlaysWereMade = xPlaysLength + oPlaysLength === this.state.maxPlays;

        if (allPlaysWereMade && !this.state.isGameOver) {
            this.state.isGameOver = true;
            this.state.isDraw = true;
            this.printGameStatus();
            this.renderPlayAgainButton();
        }
    }

    checkIfGameIsOver() {
        this.checkForWinner();
        if (!this.state.isGameOver) this.checkForDraw();
    }

    getStatusMessage() {
        if (this.state.isDraw) {
            return TEXTS.draw;
        } else {
            return TEXTS.winner;
        } 
    }

    printGameStatus() {
        const footer = this.createEl('footer', {
            className: 'status',
        });
        const statusMessage = this.createEl('h2', {
            className: 'status__message',
            textContent: this.getStatusMessage(),
        });
        if(!!this.state.winner) {
            const winnerName = this.createEl('span', {
                className: 'status__name',
                textContent: this.state.winner.toUpperCase() || '',
            });
            statusMessage.appendChild(winnerName);
        }        
        footer.appendChild(statusMessage);
        MAIN.appendChild(footer);
    }

    resetGame() {
        this.state = makeObjDeepCopy(INITIAL_STATE);

        const board = document.querySelector('.board');
        const statusFooter = document.querySelector('.status');
        board.remove();
        statusFooter.remove();
        this.createBoard();
    }
}

const ticTacToe = new TicTacToe();
