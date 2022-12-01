const downloadButton = document.querySelector("#download-ics");
const serviceID = document.querySelector("#service-title").dataset.id;
const serviceTitleText = document.querySelector("#service-title").dataset.title;
const downloadMessage = document.querySelector("#calendar-download-message");

const downloadIcsFile = async () => {
    const response = await fetch(`/api/service/calendar/${serviceID}`);
    
    if(response.ok) {
        const fileContents = await response.text();

        const hiddenElement = document.createElement("a");

        hiddenElement.href = "data:attachment/text," + encodeURI(fileContents);
        hiddenElement.target = "_blank";
        hiddenElement.download = `${serviceID}-${serviceTitleText}.ics`;
        hiddenElement.click();
    } else {
        const responseText = await response.json();
        downloadMessage.textContent = responseText.message;
    }
};

downloadButton.addEventListener("click", downloadIcsFile);