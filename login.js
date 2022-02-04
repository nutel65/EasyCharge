
function loginPageLoad() {
    document.getElementById("register-submit").addEventListener('click', function (event) {
        registerFormSubmit();
    });
    document.getElementById("login-submit").addEventListener('click', function (event) {
        loginFormSubmit();
    });
}

function registerFormSubmit() {
    let errorTextElem = document.getElementById("register-error-text")
    let email = document.getElementById("register-email").value
    let password = document.getElementById("register-password").value
    let passwordRepeat = document.getElementById("register-repeat-password").value

    if (email == "") {
        errorTextElem.innerHTML = "nie podano adresu e-mail"
        return
    }

    if (password.length < 3) {
        errorTextElem.innerHTML = "wymagane jest silniejsze hasło"
        return
    }


    if (window.localStorage.getItem(email) != null) {
        errorTextElem.innerHTML = "konto o podanym adresie e-mail już istnieje"
        return
    }

    if (password != passwordRepeat) {
        errorTextElem.innerHTML = "hasła się nie zgadzają"
        return
    }

    // dla ułatwienia realizacji zadania, dane konta będą przechowane lokalnie
    window.localStorage.setItem(email, password);
    errorTextElem.innerHTML = '<span style="color: green;">Zarejestrowano pomyślnie. Możesz teraz się zalogować.</span>'
}

function loginFormSubmit() {
    let errorTextElem = document.getElementById("login-error-text")
    let email = document.getElementById("login-email").value
    let password = document.getElementById("login-password").value

    if (email == "") {
        errorTextElem.innerHTML = "nie podano adresu e-mail"
        return
    }

    if (password.length == "") {
        errorTextElem.innerHTML = "nie podano hasło"
        return
    }

    let storedPassword = window.localStorage.getItem(email)

    if (storedPassword == null) {
        errorTextElem.innerHTML = "konto o podanym adresie e-mail nie istnieje"
        return
    }

    if (storedPassword != password) {
        errorTextElem.innerHTML = "podano nieprawidłowe hasło"
        return
    }

    window.sessionStorage.setItem('email', email);
    errorTextElem.innerHTML = '<span style="color: green;">Zalogowano</span>'
    window.location.replace("admin.html")
}