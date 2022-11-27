const form = document.querySelector("#signin-form");
const messageBox = document.querySelector("#message-box");


const signinFormHandler = async (event) => {
    event.preventDefault ();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
        // add location of main dashboard
        const response = await fetch ('/api/user/login', {
            method: 'POST',
            body: JSON.stringify ({email, password}),
            headers: {
                'Content-type' : 'application/json'
            },
        });


        if (response.ok){
            document.location.replace("/");
        } else {
            const resContent = await response.json();
            messageBox.textContent = resContent.message;
        }

    } else {
        messageBox.textContent = "Please enter an email address and a password";
    }
};

form.addEventListener ('submit', signinFormHandler);