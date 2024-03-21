let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
updateStatus();

function handleCellClick(event) {
    const cellIndex = event.target.id.split('-')[1];
    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            status.textContent = `Jogador ${currentPlayer} venceu!`;
            disableCells();
        } else if (checkDraw()) {
            status.textContent = 'Empate!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }
    }
}

function updateStatus() {
    status.textContent = `Vez do Jogador ${currentPlayer}`;
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function disableCells() {
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
    updateStatus();
}
