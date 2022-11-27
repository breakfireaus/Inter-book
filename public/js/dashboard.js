// Selectors from the dashboard view

const { response } = require("express");

const currentServices = document.querySelector('#current-services');
const addService = document.querySelector('#addService');
const serviceForm = document.querySelector('#service-form');
const postServiceBtn = document.querySelector('#post-service');

const title = document.querySelector("#title");
const industry = document.querySelector("#industry");
const description = document.querySelector("#description");
const start = document.querySelector("#start");
const end = document.querySelector("#end");
const hourlyRate = document.querySelector("#hourly-rate");
const maxBookings =  document.querySelector("#max-bookings");



function hideAddService () {
    addService.hidden = true;
}

hideAddService ();

const postService = async (event) => {
    event.preventDefault();
    
    currentServices.hidden = true;
    postServiceBtn.hidden = true;
    addService.hidden = true;
}

const newService = async (event) => {
    event.preventDefault();

    if (!title ||
        !industry ||
        !description ||
        !start ||
        !end ||
        !hourlyRate ||
        !maxBookings ) {

    alert("Please ensure all fields are entered.")
}

    const serviceObject = {
        title: title,
        industry: industry,
        description: description,
        start: start,
        end: end,
        hourly_rate: hourlyRate,
        max_bookings: maxBookings
    }

    if (title && industry && description && start && end && hourlyRate && maxookings) {
        
        const response = await fetch ('api/service/create', {
            method: 'POST',
            body: JSON.stringify(serviceObject),
            headers: {
                "Content-type": "application/json"
            }
        });

        if (response.ok) {
            addService.setAttribute("hidden", "false")
            location.reload()
        } else {
            alert ("An error occurred. Please try again")
        }
    }
}

postServiceBtn.addEventListener ('click', postService);
serviceForm.addEventListener ('click', newService);