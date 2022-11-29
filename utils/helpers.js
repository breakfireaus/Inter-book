const check_availability = (bookings, max_bookings) => {
    if(bookings.length < max_bookings){
        return `<button class="btn btn-primary" id="book">Attend event</button>`;
    } else {
        return `<h3>Sorry, this event is full!</h3>`;
    }
}

const format_date = (dateToFormat) =>{
    const date = new Date(dateToFormat);

    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const day = date.getDate();
    const month = ("0" + date.getMonth()).slice(-2);
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
}




module.exports = { format_date, check_availability };