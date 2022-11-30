const bookingList = document.querySelector(".confirm-booking-list");
const confirmMessageBox = document.querySelector("#confirmation-messagebox");


const bookingConfirmHandler = async (event) => {

    console.log(event);
    if (event.target.id === "confirm") {
        
        const booking_id = event.target.dataset.id;

        const response = await fetch ("/api/booking/confirm", {
            method: "PATCH",
            body: JSON.stringify({booking_id}),
            headers: {
                'Content-type': 'application/json'
            },
        });


        if(response.ok){
            location.reload();
        } else {
            const responseContent = await response.json();
            confirmMessageBox.textContent = responseContent.message; 
        }
    }


}


bookingList.addEventListener("click", bookingConfirmHandler);