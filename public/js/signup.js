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

    // Validate Password 

    if (password.length < 8 ) {
        messageBox.textContent = "Please enter a password with at least 8 characters."
    }

    if (firstName && lastName && email && password) {
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