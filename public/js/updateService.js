const titleInput = document.querySelector("#updatedTitle");
const industryInput = document.querySelector("#updatedIndustry");
const descriptionInput = document.querySelector("#updatedDescription");
const startInput = document.querySelector("#updatedStart");
const endInput = document.querySelector("#updatedEnd");
const hourlyrateInput = document.querySelector("#updatedHourlyRate");
const maxbookingsInput = document.querySelector("#updatedMaxBookings");


document.querySelector("#update").addEventListener("click", async (event)=>{
    event.preventDefault();
    const editService = {
        title : titleInput.value,
        Industry : industryInput.value,
        Description : descriptionInput.value,
        Start : startInput.value,
        End : endInput.value,
        Hourly_rate : hourlyrateInput.value,
        Max_bookings : maxbookingsInput.value,
    }
    fetch((`/api/booking/:id`),{
        method:"PUT",
        body:JSON.stringify(editService),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("Service updated")
            location.href="/dashboard"
        } else {
            alert("Failed to update service. Please check all fields and try again.")
        }
    })
});

document.querySelector("#cancel").addEventListener("click", async (event)=>{
    event.preventDefault();
    fetch((`/api/booking/:id`),{
        method:"DELETE",
    }).then(res=>{
        if(res.ok){
            console.log("Service cancelled")
            location.href="/dashboard"
        } else {
            alert("Failed to cancel booking. Please try again")
        }
    })
});