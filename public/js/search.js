const searchForm = document.querySelector("#search-form");

const searchFormHandler = (event) => {
    event.preventDefault();

    
    document.location.replace("/search");
};


searchForm.addEventListener("submit", searchFormHandler);