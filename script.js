class TicTacToe {
    state = {
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
        winningPositions: [
            [1,2,3],
            [1,4,7],
            [1,5,9],
            [2,5,8],
            [3,5,7],
            [3,6,9],
            [4,5,6],
            [7,8,9]
        ],
        texts: {
            playerX: 'x',
            playerO: 'o',
            draw: 'It\s a draw',
            winner: 'The winner is: ',
            ticTacToe: 'Tic Tac Toe',
            playAgain: 'Play Again',
        }
    };

    constructor() {
        this.renderMainTitle();
        this.createBoard();
    }

    renderMainTitle() {
        const main = document.querySelector('#main');
        const mainTitle = document.createElement('h1');
        mainTitle.classList.add('main-title');
        mainTitle.textContent = this.state.texts.ticTacToe;
        main.appendChild(mainTitle);
    }

    createBoard() {
        const main = document.querySelector('#main');
        const boardContainer = document.createElement('div');
        boardContainer.setAttribute('id', 'container');
        main.appendChild(boardContainer);
        for (let i = 1; i < 10; i++) {
            const fieldContainer = document.createElement('div');
            fieldContainer.setAttribute('id', `field-${i}`);
            fieldContainer.classList.add('field');
            fieldContainer.dataset.fieldNumber = i;
            boardContainer.appendChild(fieldContainer);

            const fieldButton = document.createElement('button');
            fieldButton.setAttribute('id', `button-${i}`);
            fieldContainer.appendChild(fieldButton);
        }
    }

    makeMove(field) {
        if (!this.state.isGameOver) {
            this.printPlayerInBoard(field);
            this.registerPlayerFieldPosition(field.dataset.fieldNumber);
            this.changeTurn();
            this.removeEmptyCellButton(field.dataset.fieldNumber);
            this.checkIfGameIsOver();
        }
    }

    getCorrectText() {
        if (this.state.turn === 0) {
            return this.state.texts.playerX.toUpperCase();
        } else {
            return this.state.texts.playerO.toUpperCase();
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
        const playAgainButton = document.createElement('button');
        playAgainButton.setAttribute('id', 'play-again-button');
        playAgainButton.textContent = this.state.texts.playAgain;
        const statusContainer = document.querySelector('.status-container');
        statusContainer.appendChild(playAgainButton);
    }

    removeEmptyCellButton(fieldNumber) {
        const buttonField = document.querySelector(`#button-${fieldNumber}`);
        buttonField.remove();
    }

    printPlayerInBoard(field) {
        const fieldText = document.createElement('h2');
        fieldText.textContent = this.getCorrectText();
        field.appendChild(fieldText);
    }

    checkForWinner() {
        const { winningPositions } = this.state;

        winningPositions.forEach(winArray => {
            const xContainsWinPosition = winArray.every(element => {
                return this.state.x.fieldPositions.includes(element.toString());
            })
            if (xContainsWinPosition) {
                this.state.isGameOver = true;
                this.state.winner = this.state.texts.playerX;
                this.printGameStatus();
                this.renderPlayAgainButton();
                return;
            }

            const oContainsWinPosition = winArray.every(element => {
                return this.state.o.fieldPositions.includes(element.toString());
            })
            if (oContainsWinPosition) {
                this.state.isGameOver = true;
                this.state.winner = this.state.texts.playerO;
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

    printGameStatus() {
        const boardContainer = document.getElementById('container');
        const statusContainer = document.createElement('div');
        statusContainer.classList.add('status-container');
        boardContainer.appendChild(statusContainer);
        const status = document.createElement('h2');
        status.setAttribute('id', 'game-status-heading');
        if (this.state.isDraw) {
            status.textContent = this.state.texts.draw;
        } else {
            status.textContent = this.state.texts.winner + this.state.winner.toUpperCase();
        } 
        statusContainer.appendChild(status);
    }

    resetGame() {
        this.state = {
            ...this.state,
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
        }

        const boardContainer = document.getElementById('container');
        boardContainer.remove();
        this.createBoard();
    }
}

const ticTacToe = new TicTacToe();

document.addEventListener('click', event => {
    if (event.target.parentNode.classList.contains('field')) {
        if (event.target.textContent === '') {
            ticTacToe.makeMove(event.target.parentNode);
        }
    }

    if (event.target.id === 'play-again-button') {
        ticTacToe.resetGame();
    }
});

document.addEventListener('keyup', event => {
    if (event.code === 'Enter' && event.target.classList.contains('field-button')) {
        if (event.target.textContent === '') {
            ticTacToe.makeMove(event.target.parentNode);
        }
    }

    if (event.code === 'Enter' && event.target.id === 'play-again-button') {
        ticTacToe.resetGame();  
    }
});
