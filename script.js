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
            playerX: 'dracula',
            playerO: 'van helsing',
            draw: 'It\'s a draw',
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
        const header = document.createElement('header');
        main.appendChild(header);
        const headerTitle = document.createElement('h1');
        headerTitle.classList.add('header-title');
        headerTitle.textContent = this.state.texts.ticTacToe;
        header.appendChild(headerTitle);
    }

    createBoard() {
        const main = document.querySelector('#main');
        const board = document.createElement('main');
        board.classList.add('board')
        main.appendChild(board);
        for (let i = 1; i < 10; i++) {
            const boardField = document.createElement('div');
            boardField.classList.add('board__field')
            boardField.classList.add(`board__field--${i}`)
            boardField.dataset.fieldNumber = i;
            board.appendChild(boardField);

            const boardFieldButton = document.createElement('button');
            boardFieldButton.classList.add('board__field__button');
            boardFieldButton.classList.add(`board__field__button--${i}`);
            boardField.appendChild(boardFieldButton);
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
        playAgainButton.classList.add('status__button')
        playAgainButton.textContent = this.state.texts.playAgain;
        const statusContainer = document.querySelector('.status');
        statusContainer.appendChild(playAgainButton);
    }

    removeEmptyCellButton(fieldNumber) {
        const buttonField = document.querySelector(`.board__field__button--${fieldNumber}`);
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
        const playerImage = document.createElement('img');
        playerImage.classList.add('board__field_img')
        playerImage.setAttribute('alt', 'player-image');
        const srcAttribute = this.getCorrectImageSrc();
        playerImage.setAttribute('src', srcAttribute)
        field.appendChild(playerImage);
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
        const board = document.querySelector('#main');
        const footer = document.createElement('footer');
        footer.classList.add('status');
        board.appendChild(footer);
        const statusMessage = document.createElement('h2');
        statusMessage.classList.add('status__message')
        if (this.state.isDraw) {
            statusMessage.textContent = this.state.texts.draw;
        } else {
            statusMessage.textContent = this.state.texts.winner + ' ';
            const winnerName = document.createElement('span');
            winnerName.classList.add('status__message__name');
            winnerName.textContent = this.state.winner.toUpperCase();
            statusMessage.appendChild(winnerName);
        } 
        footer.appendChild(statusMessage);
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

        const board = document.querySelector('.board');
        const statusFooter = document.querySelector('.status');
        board.remove();
        statusFooter.remove();
        this.createBoard();
    }
}

const ticTacToe = new TicTacToe();

document.addEventListener('click', event => {
    if (event.target.parentNode.classList.contains('board__field')) {
        if (!event.target.classList.contains("board__field_img")) {
            ticTacToe.makeMove(event.target.parentNode);
        }
    }

    if (event.target.classList.contains('status__button')) {
        ticTacToe.resetGame();
    }
});

document.addEventListener('keyup', event => {
    if (event.code === 'Enter' && event.target.classList.contains('board__field__button')) {
        if (!event.target.classList.contains("board__field_img")) {
            ticTacToe.makeMove(event.target.parentNode);
        }
    }

    if (event.code === 'Enter' && event.target.classList.contains('status__button')) {
        ticTacToe.resetGame();  
    }
});
