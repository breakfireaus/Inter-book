const { response } = require("express");

const addServiceFormHandler = async function (event) {
    event.preventDefault();
    
    const serviceTitle = document.querySelector('#service-title').value;
    const sessionTime = document.querySelector ('#session-time').value;
    const description = document.querySelector ('#service-description').value;
    const paymentMethod = document.querySelector ('#payment-methods').value;

    const response = await fetch ('/bookings', {
        method: 'POST',
        body: JSON.stringify ({
            serviceTitle,
            sessionTime,
            description,
            paymentMethod
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert (response.statusText);
    }
}

// TO DO: Check add service form ID
document.querySelector('#service-form').addEventListener('submit', addServiceFormHandler);
