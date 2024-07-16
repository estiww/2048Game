
const player = document.getElementById("player");

if (localStorage.getItem('2048currentUser')) {
    currentUser = JSON.parse(localStorage.getItem('2048currentUser'));
    if (localStorage.getItem('2048users')) {
        users = JSON.parse(localStorage.getItem('2048users'));
        player.innerHTML ="Hello " +users[currentUser].name;
    }
}