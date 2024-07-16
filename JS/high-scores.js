let users = [];
const player = document.getElementById("player");
let currentUser;
let usersCount;

if (localStorage.getItem('2048users')) {
    users = JSON.parse(localStorage.getItem('2048users'));
}

if (localStorage.getItem('2048usersCount')) {
    usersCount = JSON.parse(localStorage.getItem('2048usersCount'));
}

if (localStorage.getItem('2048currentUser')) {
    currentUser = JSON.parse(localStorage.getItem('2048currentUser'));
    if (localStorage.getItem('2048users')) {
        player.innerHTML = "Hello " + users[currentUser].name;
    }
}

function buildTable() {
    var tableBody = document.getElementById("table-body");
    var numPlayers = document.getElementById("num-players");
    tableBody.innerHTML = "";
    numPlayers.textContent = usersCount;
    for (var i = 0; i < usersCount; i++) {
        var row = document.createElement("tr");
        var nameCell = document.createElement("td");
        var scoreCell = document.createElement("td");
        nameCell.textContent = users[i].name;
        scoreCell.textContent = users[i].points;
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        tableBody.appendChild(row);
    }
}

buildTable();