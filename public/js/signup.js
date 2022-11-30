const formElement = document.querySelector(".signup-form");

const firstnameInput = document.querySelector("#first-name");
const lastnameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const messageBox = document.querySelector("#message-box");


const signupFormHandler = async (event) => {
    event.preventDefault()

    const firstName = firstnameInput.value.trim();
    const lastName = lastnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (firstName && lastName && email && password) {
        // Validate input
        if (firstName < 1 || firstName > 20){
            messageBox.textContent = "First name must be between 1 and 20 characters long";
            firstnameInput.focus();
            return;
        } else if (lastName < 1 || lastName > 20){
            messageBox.textContent = "Last name must be between 1 and 20 characters long";
            lastnameInput.focus();
            return;
        } else if (!email.match(/^[a-z0-9]+(?:[._-][a-z0-9]+|[a-z0-9]*)*@[a-z0-9]+\.(?:(com)|(org)|(net))(?:.[a-z]{2,2})?$/i)){
            messageBox.textContent = "Email must be in the format of name@example.com/.net/.org(.au)";
            emailInput.focus();
            return;
        } else if (password.length < 8 ) {
            messageBox.textContent = "Please enter a password with at least 8 characters.";
            passwordInput.focus();
            return;
        } 


        const response = await fetch ('/api/user/create', {
            method: 'POST',
            body: JSON.stringify ({
                first_name: firstName,
                last_name: lastName,
                email,
                password
            }),
            headers: {'Content-type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            const responseData = await response.json();
            messageBox.textContent = responseData.message;
        }
    } else {
        messageBox.textContent = "Please check that all fields are entered";
    }
}

formElement.addEventListener('submit', signupFormHandler);