document.querySelector("#update").addEventListener("click",event=>{
    event.preventDefault();
    const editService = {
        title :document.querySelector("#updateTitle").value,
        Industry :document.querySelector("#updatedIndustry").value,
        Description :document.querySelector("#updatedDescription").value,
        Start :document.querySelector("#updatedSessionStart").value,
        End :document.querySelector("#updatedSessionEnd").value,
        Hourly_rate :document.querySelector("#updatedHourlyRate").value,
        Max_bookings :document.querySelector("#updatedMaxBookings").value,
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
})

document.querySelector("#cancel").addEventListener("click",event=>{
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
})