let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
let loginBtn = document.getElementById("clkbtnLogin");
let signupBtn = document.getElementById("clkbtnSignup");
const loginUserName = document.getElementById("loginUserName");
const signupUserName = document.getElementById("signupUserName");
const loginPassword = document.getElementById("loginPassword");
const signupPassword = document.getElementById("signupPassword");
const signupConfirmPassword = document.getElementById("signupConfirmPassword");



signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});

loginBtn.addEventListener("click", newlogin);

signupBtn.addEventListener("click", newsignup);

let users = [];
let usersCount = 0;
let userDoesntExist = false;

function newlogin() {
    let i;
    for (i = 0; i < usersCount; i++) {
        if (users[i].name === loginUserName.value) {
            userDoesntExist = true;
            break;
        }
    }

    if (userDoesntExist === false) {
        alert('User not exists');
        slider.classList.add("moveslider");
        formSection.classList.add("form-section-move");
        signupUserName.value = loginUserName.value;
        loginUserName.value = "";
        loginPassword.value = "";
        return;
    }

    if (loginPassword.value !== users[i].password) {
        alert('incorect password');
        loginPassword.value = "";
        return;
    }

    let currentUser = i;
    localStorage.setItem('2048currentUser', JSON.stringify(currentUser));
    window.location.replace('../HTML/game.html');
}

function newsignup() {
    if (/^.*(?=.{2,})[a-zA-Zא-ת].*$/.test(signupUserName.value)!==true) {
        alert('Invalid username, Username must contain at least 2 letters');
        return;
    }

    if (signupPassword.value.length < 4) {
        alert('Invalid password, Password must contain at least 4 characters');
        return;
    }

    for (let i = 0; i < usersCount; i++) {
        if (users[i].name === signupUserName.value) {
            alert('User already exists');
            slider.classList.remove("moveslider");
            formSection.classList.remove("form-section-move");
            loginUserName.value = signupUserName.value;
            signupUserName.value = "";
            signupPassword.value = "";
            signupConfirmPassword.value = "";
            return;
        }
    }


    if (signupPassword.value !== signupConfirmPassword.value) {
        alert('incorect password');
        signupPassword.value = "";
        signupConfirmPassword.value = "";
        return;
    }

    users.push({
        name: signupUserName.value,
        password: signupPassword.value,
        points: 0
    });
    localStorage.setItem('2048currentUser', JSON.stringify(usersCount));
    usersCount++;
    localStorage.setItem('2048usersCount', JSON.stringify(usersCount));
    localStorage.setItem('2048users', JSON.stringify(users));
    window.location.replace('../HTML/game.html');
}

if (localStorage.getItem('2048users')) {
    users = JSON.parse(localStorage.getItem('2048users'));
}

if (localStorage.getItem('2048usersCount')) {
    usersCount = parseInt(localStorage.getItem('2048usersCount'));
}

if (localStorage.getItem('2048currentUser')) {
    currentUser = JSON.parse(localStorage.getItem('2048currentUser'));
}