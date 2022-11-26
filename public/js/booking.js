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

// Edit post

// Check querySelector ID 

document.querySelector("#update").addEventListener("click",event=>{
    event.preventDefault();
    const bookingID = document.querySelector("#").value;
    const editBooking = {
        title:document.querySelector("#").value,
        content:document.querySelector("#").value,
    }

    fetch((`/api/bookings/${bookingID}`),{
        method:"PUT",
        body:JSON.stringify(editBooking),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("Booking edited")
            location.href="/dashboard"
        } else {
            alert("An error occurred. Please try again.")
        }
    })
})

document.querySelector("#cancel").addEventListener("click",event=>{
    event.preventDefault();
    const bookingID = document.querySelector("#").value;
    fetch((`/api/blogs/${bookingID}`),{
        method:"DELETE",
    }).then(res=>{
        if(res.ok){
            console.log("booking cancelled")
            location.href="/dashboard"
        } else {
            alert("An error occurred. Please try again.")
        }
    })
})


// TO DO: Check add service form ID
document.querySelector('#service-form').addEventListener('submit', addServiceFormHandler);
