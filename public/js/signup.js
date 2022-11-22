const signupFormHandler = async (event) => {
    event.preventDefault()

    const firstName = document.querySelector ('#first-name-signup').value.trim();
    const lastName = document.querySelector ('#last-name-signup').value.trim();
    const email = document.querySelector ('#email-signup').value.trim();
    const password = document.querySelector ('#password-signup').value.trim();
    const state = document.querySelector ('#state-signup').value.trim();

    if (firstName && lastName && email && password && state) {
        const response = await fetch ('/api/users', {
            method: 'POST',
            body: JSON.stringify ({firstName, lastName, email, password, state}),
            headers: {'Content-type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert ('Please check that all fields are entered');
        }
    }
}

document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);