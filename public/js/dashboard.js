// Selectors from the dashboard view


const currentServices = document.querySelector('#current-services');
const addService = document.querySelector('#add-service-modal');
const serviceForm = document.querySelector('#service-form');
const postServiceBtn = document.querySelector('#add-new-service');

const titleInput = document.querySelector("#title");
const industryInput = document.querySelector("#industry");
const descriptionInput = document.querySelector("#description");
const startInput = document.querySelector("#start");
const endInput = document.querySelector("#end");
const hourlyRateInput = document.querySelector("#hourly-rate");
const maxBookingsInput =  document.querySelector("#max-bookings");

const messageBox = document.querySelector("#message-box");



// function hideAddService () {
//     addService.hidden = true;
// }

// hideAddService ();

// const postService = async (event) => {
//     event.preventDefault();
    
//     currentServices.hidden = true;
//     postServiceBtn.hidden = true;
//     addService.hidden = true;
// }

const newService = async (event) => {
    
    event.preventDefault();

    const title = titleInput.value.trim();
    const industry = industryInput.value;
    const description = descriptionInput.value.trim();
    const start = startInput.value;
    const end = endInput.value;
    const hourlyRate = hourlyRateInput.value.trim();
    const maxBookings = maxBookingsInput.value.trim();

    if (!title ||
        !industry ||
        !description ||
        !start ||
        !end ||
        !hourlyRate ||
        !maxBookings ) {
        
        messageBox.textContent = "Please fill out all of the fields";
        
    } else {

        const body = {
            title: title,
            industry: industry,
            description: description,
            start: start,
            end: end,
            hourly_rate: hourlyRate,
            max_bookings: maxBookings
        }
            
        const response = await fetch ('/api/service/create', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json"
            }
        });

        
        if (response.ok) {
            const responseContent = await response.json();
            document.location.replace(responseContent.redirect);
        } else {
            const responseContent = await response.json();
            messageBox.textContent = responseContent.message;
        }
        
    }
}

// postServiceBtn.addEventListener ('click', postService);
serviceForm.addEventListener ('submit', newService);