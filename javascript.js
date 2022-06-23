const form = document.getElementsByTagName('form')[0];

const email = document.getElementById('email');
const emailError = document.querySelector('#email + span.error');

const country = document.getElementById('country');
const countryError = document.querySelector('#country + span.error');

const zip = document.getElementById('zip');
const zipError = document.querySelector('#zip + span.error');

const password = document.getElementById('password');
const passwordError = document.querySelector('#password + span.error');

const passConfirm = document.getElementById('pass-confirm');
const passConfirmError = document.querySelector('#pass-confirm + span.error');



const emailValidate = function emailVal () {
    if (email.validity.valid) {
        emailError.textContent = '';
        emailError.className = 'error';
    } else {
        showError("email");
    }
}

// Once user has incorrectly filled a form and left, each new input will be evaluated

email.addEventListener('blur', function() {
    emailValidate();
    email.addEventListener('input', emailValidate);
});

const countryValidate = function countryVal () {
    if (country.validity.valid) {
        countryError.textContent = '';
        countryError.className = 'error';
    } else {
        showError("country");
    }
}

country.addEventListener('blur', function () {
    countryValidate();
    country.addEventListener('input', countryValidate);
});

const zipValidate = function zipVal () {
    if (zip.validity.valid) {
        zipError.textContent = '';
        zipError.className = 'error';
    } else {
        showError("zip");
    }
}

zip.addEventListener('blur', function () {
    zipValidate();
    zip.addEventListener('input', zipValidate);
});

const passValidate = function passVal () {
    let validPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    if(!password.value.match(validPass)){
        password.setAttribute('isvalid', 'false');
        showError("password");
    } else if (password.validity.valid) {
        passwordError.textContent = '';
        passwordError.className = 'error';
    } else {
        showError("password");
    }
}

password.addEventListener('blur', function () {
    passValidate();
    password.addEventListener('input', passValidate);
});

const passConfirmValidate = function passConfirmVal () {
    let validConfirm = password.value;

    if(passConfirm.value !== validConfirm){
        passConfirm.setAttribute('isvalid', 'false');
        showError("passConfirm");
    } else if (passConfirm.validity.valid) {
        passConfirmError.textContent = '';
        passConfirmError.className = 'error';
    } else {
        showError("passConfirm");
    }
}

passConfirm.addEventListener('blur', function () {
    passConfirmValidate();
    passConfirm.addEventListener('input', passConfirmValidate);
});

form.addEventListener('submit', function (event) {
    if(!email.validity.valid || !country.validity.valid || !zip.validity.valid || !password.validity.valid || !passConfirm.validity.valid){
        event.preventDefault();
    }
});


const showError = function error(input){
    switch(input){
        case "email":
            emailError.className = 'error active';
            switch(true){
                case email.validity.valueMissing: emailError.textContent = "Please enter an email address";
                break;

                case email.validity.typeMismatch: emailError.textContent = "Please check email format";
                break;

                case email.validity.tooShort: emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
                break;
            }
        break;

        case "country":
            countryError.className = 'error active';
            switch(true){
                case country.validity.valueMissing: countryError.textContent = "Please enter a country";
                break;

                default: countryError.textContent = "Please check country format";
                break;
            }
        break;
        
        case "zip":
            zipError.className = 'error active';
            switch(true){
                case zip.validity.valueMissing: zipError.textContent = "Please enter a zip code";
                break;

                default: zipError.textContent = "Please check zip format";
                break;
            }
        break;

        case "password":
            let validPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            passwordError.className = 'error active';
            switch(true){
                case password.validity.valueMissing: passwordError.textContent = "Please enter a password";
                break;

                case (!(password.value.match(validPass))): passwordError.textContent = "Must be 7 to 15 characters long with at least one numeric digit and one special character";
                break;
            }
        break;

        case "passConfirm":
            let validConfirm = password.value;
            passConfirmError.className = 'error active';
            switch(true){
                case passConfirm.validity.valueMissing: passConfirmError.textContent = "Please confirm password";
                break;

                case passConfirm.value !== validConfirm: passConfirmError.textContent = "Please make sure passwords match.";
                break;
            }
        break;
    }
}