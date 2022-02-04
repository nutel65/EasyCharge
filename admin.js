document.addEventListener("DOMContentLoaded", function(){
    let email = window.sessionStorage.getItem('email')

    loginBtn = document.getElementById("js-logged-as-text").innerHTML = email
    loginBtn = document.getElementById("js-delete-account-btn").addEventListener('click', function() {
        console.log("click delete")
        deleteAccount(email);
    });
    loginBtn = document.getElementById("js-log-out-btn").addEventListener('click', function() {
        console.log("click log out")
        logOut(email);
    });
});


function isLoggedIn() {
    if (window.sessionStorage.getItem('email') != null) {
        return true
    }
    return false;
}

function deleteAccount(email) {
    window.localStorage.removeItem(email)
    logOut()
    window.location.replace("login.html");   
}

function logOut() {
    window.sessionStorage.removeItem("email")
    window.location.replace("login.html");   
}