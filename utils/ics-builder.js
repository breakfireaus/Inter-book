const moment = require("moment");
const ics = require("ics");
const { Service } = require("../models/index");
const { writeFile } = require("fs/promises");
const { existsSync } = require("fs");
const path = require("path");

const buildIcs = async (service, directory) => {

    const existingFile = path.join(directory, `${service.id}-${service.title}.ics`);

    if (!existsSync(existingFile)){
        
        const startString = moment(service.start).format("YYYY-M-D-H-m").split("-");
        const endString = moment(service.end).format("YYYY-M-D-H-m").split("-");

        const start = startString.map((element) => parseInt(element));
        const end = endString.map((element) => parseInt(element));

        console.log(start);
        console.log(end);

        let fileContents;
        try{
            fileContents = ics.createEvent({
                title: service.title,
                start: start,
                end: end, 
                description: service.description,
                organizer: { name: `${service.user.first_name} ${service.user.last_name}`, email: service.user.email, },
            });
        } catch (err) {
            throw new Error ("Failed to build ICS file");
        }

        await writeFile(path.join(directory, `${service.id}-${service.title}.ics`), fileContents.value);
    }

    

    return `${service.id}-${service.title}.ics`;


}


module.exports = buildIcs;
