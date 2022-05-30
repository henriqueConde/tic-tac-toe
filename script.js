class TicTacToe {
    main = document.querySelector('#main');
    boardContainer = undefined;
    state = {
        turn: 'x',
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
            [4,5,6],
            [7,8,9]
        ]
    };

    constructor() {
        this.createBoard();
    }

    createBoard() {
        const boardContainer = document.createElement('div');
        boardContainer.setAttribute('id', 'container')
        main.appendChild(boardContainer);
        for (let i = 1; i < 10; i++) {
            const fieldContainer = document.createElement('div');
            fieldContainer.setAttribute('id', `field-${i}`);
            fieldContainer.classList.add('field');
            fieldContainer.dataset.fieldNumber = i;
            boardContainer.appendChild(fieldContainer);
            this.boardContainer = boardContainer;

            const fieldButton = document.createElement('button');
            fieldButton.setAttribute('id', `button-${i}`);
            fieldContainer.appendChild(fieldButton);
        }
    }

    getCorrectText() {
        if (this.state.turn === 'x') {
            return 'X';
        } else {
            return 'O';
        }
    }

    changeTurn(fieldNumber) {
        if (this.state.turn === 'x') {
            this.state.turn = 'o';
            this.state.x.fieldPositions.push(fieldNumber);
        } else {
            this.state.turn = 'x';
            this.state.o.fieldPositions.push(fieldNumber);
        }
    }

    renderPlayAgainButton() {
        const playAgainButton = document.createElement('button');
        playAgainButton.setAttribute('id', 'play-again-button');
        playAgainButton.textContent = 'Play Again';
        const statusContainer = document.querySelector('.status-container');
        statusContainer.appendChild(playAgainButton);
    }

    makeMove(field) {
        if(!this.state.isGameOver) {
            const fieldText = document.createElement('h2');
            fieldText.textContent = this.getCorrectText();
            field.appendChild(fieldText)
            this.changeTurn(field.dataset.fieldNumber);
            const buttonField = document.querySelector(`#button-${field.dataset.fieldNumber}`);
            buttonField.remove();
            this.checkIfGameIsOver();
            if(this.state.isGameOver) {
                this.renderPlayAgainButton();
            }
        }
    }

    checkForWinner() {
        const { winningPositions } = this.state;
        const sortedXString = this.state.x.fieldPositions.sort((a,b)=>a-b).join('');
        const sortedOString = this.state.o.fieldPositions.sort((a,b)=>a-b).join('');

        winningPositions.forEach(winArray => {
            const winString = winArray.join('');
            if(sortedXString.includes(winString)) {
                this.state.isGameOver = true;
                this.state.winner = 'x';
                this.printGameStatus();
            }

            if(sortedOString.includes(winString)) {
                this.state.isGameOver = true;
                this.state.winner = 'o'
                this.printGameStatus();
            }
        })
    }

    checkForDraw() {
        const xPlaysLength = this.state.x.fieldPositions.length;
        const oPlaysLength = this.state.o.fieldPositions.length;

        if(xPlaysLength + oPlaysLength === this.state.maxPlays && !this.state.isGameOver) {
            this.state.isGameOver = true;
            this.state.isDraw = true;
            this.printGameStatus();
        }
    }

    checkIfGameIsOver() {
        this.checkForWinner();
        if(!this.state.isGameOver) this.checkForDraw();
    }

    printGameStatus() {
        const statusContainer = document.createElement('div');
        statusContainer.classList.add('status-container');
        this.boardContainer.appendChild(statusContainer);
        const status = document.createElement('h2');
        status.setAttribute('id', 'game-status-heading')
        if(this.state.isDraw) {
            status.textContent = 'It\'s a draw';
        } else {
            status.textContent = 'The winner is: ' + this.state.winner.toUpperCase();
        } 
        statusContainer.appendChild(status);
    }

    resetGame() {
        this.state = {
            ...this.state,
            turn: 'x',
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

        this.boardContainer.remove();
        this.createBoard();
    }
}

const ticTacToe = new TicTacToe();

document.addEventListener('click', event => {
    if(event.target.parentNode.classList.contains('field')) {
        if(event.target.textContent === '') {
            ticTacToe.makeMove(event.target.parentNode);
        }
    }

    if(event.target.id === 'play-again-button') {
        ticTacToe.resetGame();
    }
});

document.addEventListener('keyup', event => {
    if(event.code === 'Enter' && event.target.classList.contains('field-button')) {
        if(event.target.textContent === '') {
            ticTacToe.makeMove(event.target.parentNode);
        }
    }

    if(event.code === 'Enter' && event.target.id === 'play-again-button') {
        ticTacToe.resetGame();  
    }
});
