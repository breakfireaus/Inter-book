const moment = require("moment");
const ics = require("ics");
const { Service } = require("../models/index");
const { writeFile } = require("fs/promises");
const { existsSync } = require("fs");
const path = require("path");

const buildIcs = async (service) => {

    if (existsSync(`${__dirname}/../ics-files/${service.id}.ics`)){
        return `${service.id}.ics`;
    }

    const startString = moment(service.start).format("YYYY-M-D-H-m").split("-");
    const endString = moment(service.end).format("YYYY-M-D-H-m").split("-");

    const start = startString.map((element) => parseInt(element));
    const end = endString.map((element) => parseInt(element));

    console.log(start);
    console.log(end);

    ics.createEvent({
        title: service.title,
        start: start,
        end: end, 
        description: service.description,
        organizer: { name: `${service.user.first_name + service.user.last_name}`, email: service.user.email, },
    }, async (error, icsContents) => {
        if (error){
            return { error };
        }
        await writeFile(`${__dirname}/../ics-files/${service.id}.ics`, icsContents);

    });

    

    return `${service.id}.ics`;


}


module.exports = buildIcs;
