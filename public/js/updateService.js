const titleInput = document.querySelector("#updatedTitle");
const industryInput = document.querySelector("#updatedIndustry");
const descriptionInput = document.querySelector("#updatedDescription");
const startInput = document.querySelector("#updatedStart");
const endInput = document.querySelector("#updatedEnd");
const hourlyrateInput = document.querySelector("#updatedHourlyRate");
const maxbookingsInput = document.querySelector("#updatedMaxBookings");
const updateBtn = document.querySelector("#update");
const cancelBtn = document.querySelector("#cancel");


const updateService = async (event) => {
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

    const response = await fetch((`/api/booking/:id`),{
        method:"PUT",
        body:JSON.stringify(editService),
        headers:{
            "Content-Type":"application/json"
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        response.json({message: 'An error occurred. Failed to update service.'})
    }
};

const cancelService = async (event)=>{
    event.preventDefault();
    
    const response = await fetch((`/api/booking/:id`),{
        method:"DELETE",
    });
    
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        response.json ({message: 'An error occurred. Failed to Cancel booking.'})
    }
};

updateBtn.addEventListener ("click", updateService);
cancelBtn.addEventListener ("click", cancelService);