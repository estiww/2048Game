const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const bestDisplay = document.getElementById('best');
const resultDisplay = document.getElementById('result');
const level256Display = document.getElementById('level256');
const level512Display = document.getElementById('level512');
const level1024Display = document.getElementById('level1024');
const level2048Display = document.getElementById('level2048');
const newScore = document.getElementById('new-score');
const btnNewGame = document.getElementById('newGame');
const player = document.getElementById("player");
let squares = [];
let numbers = [];
const width = 4;
let score = 0;
let currentUser;
let users = [];

if (localStorage.getItem('2048users')) {
    users = JSON.parse(localStorage.getItem('2048users'));
}

if (localStorage.getItem('2048currentUser')) {
    currentUser = JSON.parse(localStorage.getItem('2048currentUser'));
    if (localStorage.getItem('2048users')) {
        bestDisplay.innerHTML = users[currentUser].points;
        player.innerHTML = "Hello " + users[currentUser].name;
    }
}

createBoard();
document.addEventListener('keyup', control)

btnNewGame.addEventListener('click', changeGame);

function changeGame() {
    score = 0;
    if (localStorage.getItem('2048currentUser')) {
        bestDisplay.innerHTML = users[currentUser].points;
    }
    scoreDisplay.innerHTML = 0;
    level2048Display.style.backgroundColor = '#DADBDD';
    level1024Display.style.backgroundColor = '#DADBDD';
    level512Display.style.backgroundColor = '#DADBDD';
    level256Display.style.backgroundColor = '#DADBDD';
    for (let i = 0; i < width * width; i++) {
        numbers[i] = 0;
    }
    document.addEventListener('keyup', control);
    resultDisplay.innerHTML = 'Join the numbers and get to the 2048 tile!';
    generate();
    generate();
    addColours();
}

function createBoard() {
    for (let i = 0; i < width * width; i++) {
        let square = document.createElement('div');
        numbers[i] = 0;
        gridDisplay.appendChild(square);
        squares.push(square);
    }
    generate();
    generate();
    addColours();
}

function generate() {
    let emptySquars = [];
    for (let i = 0; i < width * width; i++) {
        if (numbers[i] === 0) {
            emptySquars.push(i);
        }
    }
    let randomNumber = Math.floor(Math.random() * emptySquars.length);
    let random24 = Math.floor(Math.random() * 8 + 1)
    if (random24 === 8) {
        numbers[emptySquars[randomNumber]] = 4;
    } else {
        numbers[emptySquars[randomNumber]] = 2;
    }
}

function move(code) {
    let width1 = 4;
    let width2 = 1;
    let newColumn;

    if (code === 37 || code === 39) {
        width1 = 1;
        width2 = 4;
    }

    for (let i = 0; i < 4; i++) {
        let totalOne = numbers[i * width2];
        let totalTwo = numbers[i * width2 + width1];
        let totalThree = numbers[i * width2 + (width1 * 2)];
        let totalFour = numbers[i * width2 + (width1 * 3)];
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);

        if (code === 37 || code === 38) {
            newColumn = filteredColumn.concat(zeros);
        }

        if (code === 39 || code === 40) {
            newColumn = zeros.concat(filteredColumn);
        }

        numbers[i * width2] = newColumn[0]
        numbers[i * width2 + width1] = newColumn[1]
        numbers[i * width2 + (width1 * 2)] = newColumn[2]
        numbers[i * width2 + (width1 * 3)] = newColumn[3]
    }
    addColours();
}

function combineRow() {
    for (let i = 0; i < 15; i++) {
        if ((i + 1) % 4 !== 0 && numbers[i] === numbers[i + 1]) {
            let combinedTotal = numbers[i] + numbers[i + 1];
            numbers[i] = combinedTotal;
            numbers[i + 1] = 0;
            score += combinedTotal;
            if (combinedTotal !== 0) {
                plusScore += combinedTotal;
            }
            scoreDisplay.innerHTML = score;
            if (localStorage.getItem('2048currentUser') && localStorage.getItem('2048users')) {
                if ((users[currentUser].points) < score) {
                    bestDisplay.innerHTML = score;
                    users[currentUser].points = score;
                    localStorage.setItem('2048users', JSON.stringify(users));
                }
            }
        }
    }
    checkForWin();
}

function combineColumn() {
    for (let i = 0; i < 12; i++) {
        if (numbers[i] === numbers[i + width]) {
            let combinedTotal = numbers[i] + numbers[i + width];
            numbers[i] = combinedTotal;
            numbers[i + width] = 0;
            score += combinedTotal;
            if (combinedTotal !== 0) {
                plusScore += combinedTotal;
            }
            scoreDisplay.innerHTML = score;
            if (localStorage.getItem('2048currentUser') && localStorage.getItem('2048users')) {
                if ((users[currentUser].points) < score) {
                    bestDisplay.innerHTML = score;
                    users[currentUser].points = score;
                    localStorage.setItem('2048users', JSON.stringify(users));
                }
            }
        }
    }
    checkForWin();
}

let seconds = 0, plusScore = 0;
let interval1;

function control(e) {
    plusScore = 0;
    clearInterval(interval1);
    if (e.keyCode === 37 || e.keyCode === 39) {
        move(e.keyCode);
        combineRow();
        move(e.keyCode);
    } else if (e.keyCode === 38 || e.keyCode === 40) {
        move(e.keyCode);
        combineColumn();
        move(e.keyCode);
    }
    if (plusScore != 0) {
        newScore.innerHTML = "+" + plusScore;
        interval1= setInterval(function () {
            seconds++;
            if (seconds == 1) {
                newScore.innerHTML = "";
                seconds = 0;
            }
        }, 1000);
    }
    checkForGameOver();
    generate();
    addColours();
}

function checkForWin() {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] == 2048) {
            resultDisplay.innerHTML = 'You WIN';
            document.removeEventListener('keyup', control);
        }
    }
}

function checkForGameOver() {
    let canContinue = false;
    for (let i = 0; i < 16; i++) {
        if (numbers[i] == 0) {
            return;
        }
        if ((i + 1) % 4 !== 0 && numbers[i] === numbers[i + 1] && numbers[i] !== 0) {
            return;
        }
        if (i < 12 && numbers[i] === numbers[i + width] && numbers[i] !== 0) {
            return;
        }
    }
    resultDisplay.innerHTML = 'You LOSE';
    document.removeEventListener('keyup', control);
}

function addColours() {
    for (let i = 0; i < squares.length; i++) {
        if (numbers[i] === 0) {
            squares[i].style.backgroundColor = '#DADBDD';
            squares[i].innerHTML = "";
        } else if (numbers[i] === 2) {
            squares[i].style.backgroundColor = '#50C878';
            squares[i].innerHTML = "2";
        } else if (numbers[i] === 4) {
            squares[i].style.backgroundColor = '#3EB489';
            squares[i].innerHTML = "4";
        } else if (numbers[i] === 8) {
            squares[i].style.backgroundColor = '#1B8A6B';
            squares[i].innerHTML = "8";
            // level256Display.style.backgroundColor = '#EB5406';
        } else if (numbers[i] === 16) {
            squares[i].style.backgroundColor = '#2E8B57';
            squares[i].innerHTML = "16";
            // level512Display.style.backgroundColor = '#EA813D';
        } else if (numbers[i] === 32) {
            squares[i].style.backgroundColor = '#08A04B';
            squares[i].innerHTML = "32";
            // level1024Display.style.backgroundColor = '#FFA600';
        } else if (numbers[i] === 64) {
            squares[i].style.backgroundColor = '#228B22';
            squares[i].innerHTML = "64";
            // level2048Display.style.backgroundColor = '#FDBD01';
        } else if (numbers[i] === 128) {
            squares[i].style.backgroundColor = '#8FB31D';
            squares[i].innerHTML = "128";
        } else if (numbers[i] === 256) {
            squares[i].style.backgroundColor = '#EB5406';
            squares[i].innerHTML = "256";
            level256Display.style.backgroundColor = '#EB5406';
        } else if (numbers[i] === 512) {
            squares[i].style.backgroundColor = '#EA813D';
            squares[i].innerHTML = "512";
            level512Display.style.backgroundColor = '#EA813D';
        } else if (numbers[i] === 1024) {
            squares[i].style.backgroundColor = '#FFA600';
            squares[i].innerHTML = "1024";
            level1024Display.style.backgroundColor = '#FFA600';
        } else if (numbers[i] === 2048) {
            squares[i].style.backgroundColor = '#FDBD01';
            squares[i].innerHTML = "2048";
            level2048Display.style.backgroundColor = '#FDBD01';
        }
    }
}