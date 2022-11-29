const serviceTitle = document.querySelector("#service-title");
const bookButton = document.querySelector("#book");
const messageBox = document.querySelector("#message-box");

const bookingEventHandler = async (event) => {

    event.preventDefault();

    const serviceId = serviceTitle.dataset.id;

    const response = await fetch(`/api/booking/create` , {
        method:"POST",
        body: JSON.stringify({
            service_id: serviceId,
        }),
        headers: {
            "Content-type": "application/json",
        }
    });
    
    if(response.ok){
        location.reload();

    } else {
        const responseData = await response.json();
        messageBox.textContent = responseData.message;
    }

}


// TO DO: Check add service form ID
bookButton.addEventListener('click', bookingEventHandler);