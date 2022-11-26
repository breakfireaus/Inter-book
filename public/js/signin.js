const signinFormHandler = async (event) => {
    event.preventDefault ();

    const email = document.querySelector('#email-signin').value.trim();
    const password = document.querySelector('#password-signin').value.trim();

    if (email && password) {
        // add location of main dashboard
        const response = await fetch ('/api/user/login', {
            method: 'POST',
            body: JSON.stringify ({email, password}),
            headers: {
                'Content-type' : 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert ('Incorrect email or password. Please try again');
        }

    }
};

document
.querySelector('.signin-form')
.addEventListener ('submit', signinFormHandler);