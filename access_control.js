document.addEventListener("DOMContentLoaded", function(){
    if (isLoggedIn()) {
        console.log("logged in")
        document.querySelectorAll(".js-logged-in-only").forEach(element => {
            element.style.display = "block"
        }); 

        loginBtn = document.getElementById("js-navbar-login-btn")
        loginBtn.href = "admin.html"
        loginBtn.innerHTML = "Zarządzaj kontem"
    } else {
        console.log("logged out")
        document.querySelectorAll(".js-logged-out-only").forEach(element => {
            element.style.display = "block"
        }); 
    }
});

function isLoggedIn() {
    if (window.sessionStorage.getItem('email') != null) {
        return true
    }
    return false;
}