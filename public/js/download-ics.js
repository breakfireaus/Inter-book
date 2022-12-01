const downloadButton = document.querySelector("#download-ics");
const serviceID = document.querySelector("#service-title").dataset.id;
const serviceTitleText = document.querySelector("#service-title").dataset.title;

const downloadIcsFile = async () => {
    const file = await fetch(`/api/service/calendar/${serviceID}`);
    const fileContents = await file.text();

    const hiddenElement = document.createElement("a");

    hiddenElement.href = "data:attachment/text," + encodeURI(fileContents);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${serviceID}-${serviceTitleText}.ics`;
    hiddenElement.click();
    
};

downloadButton.addEventListener("click", downloadIcsFile);