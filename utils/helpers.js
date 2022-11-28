const check_availability = (bookings, max_bookings) => {
    if(bookings.length < max_bookings){
        return `<button id="book">Attend event</button>`;
    } else {
        return `<h3>Sorry, this event is full!</h3>`;
    }
}





module.exports = { check_availability };