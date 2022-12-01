// http://url/api/service/*

const router = require("express").Router();
const { Service, User, Booking, Industry } = require("../../models");
const withAuth = require("../../utils/auth");
const buildIcs = require("../../utils/ics-builder");
const { existsSync } = require("fs");


router.post("/create", withAuth, async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.start ||
            !req.body.end ||
            !req.body.industry ||
            !req.body.hourly_rate ||
            !req.body.description ||
            !req.body.max_bookings
        ) {
            res.status(400).json({
                message: "Please include a title, availability, industry, hourly rate and description",
            });
            return;
        }

        const validationObject = { ...req.body };

        // TODO: validation 

        const newService = await Service.create({ ...validationObject, user_id: req.session.user_id });

        if (!newService) {
            //Render the error page and pass the message back
            res.status(500).json({
                message: "An internal server error occurred"
            })
        } else {
            //redirect to the service page for the new service
            res.status(201).json({
                message: "Service created successfully",
                redirect: `/service/${newService.id}`
            });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An internal server error occurred"
        });
    }

});

router.put("/update/:id", withAuth, async (req, res) => {
    try {
        const serviceToUpdate = await Service.findByPk(req.params.id);

        if (!serviceToUpdate) {

            res.status(404).json({
                message: "A serviec with this ID can not be found",
            });

            return;
        }

        if (serviceToUpdate.user_id != req.session.user_id) {
            res.status(401).json({
                message: `You are not authorised to modify service with ID ${req.params.id} as you are not the owner`,
            });

            return;
        }

        if (
            !req.body.title &&
            !req.body.availability &&
            !req.body.industry &&
            !req.body.hourlyRate &&
            !req.body.description
        ) {
            res.status(400).json({
                message: "Please include at least one updatable field in the request body of title, availability, industry, hourlyRate or description",
            });
            
            return;
        }

        const validationObject = { ...req.body };

        //TODO: validation/sanitisation 

        await Service.update({ ...validationObject }, {
            where: {
                id: req.params.id,
            },
        });

        //redirect to the service page
        res.status(200).json({
            redirect: `/service/${req.params.id}`
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An internal server error occurred"
        });
    }


});

router.delete("/delete/:id", withAuth, async (req, res) => {
    // We have decided to just allow users to cancel services and omit them from search results or from being displayed 
    try {
        const serviceToCancel = Service.findByPk(req.params.id);
        if (!serviceToDelete) {
            res.status(404).json({
                message: "No service with that ID exists",
            });
            return;
        }

        await Service.update({
            cancelled: true
        },
        {
            where: {
                id: req.params.id,
            }
        });


        res.status(200).json({
            message: "Service successfully cancelled",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An internal server error occurred"
        });
    }
});

router.get("/calendar/:id", async (req, res) => {
    try {
        const serviceData = await Service.findByPk(req.params.id, {
            include: [{
                model: User
            }]
        });

        if (!serviceData){
            res.status(404).json({
                message: `A service with ID ${req.params.id} could not be found`,
            });
            return;
        }

        const icsFilePath = await buildIcs(serviceData);
        
        const fileDir = `${__dirname}/../../ics-files`;
        

        if (icsFilePath.error || !existsSync(fileDir + "/" + icsFilePath)){
            res.status(500).json({
                message: "There was an issue building or serving the ICS file"
            });
        } else {
            console.log(icsFilePath);


            res.status(200).download(icsFilePath, {
                root: fileDir,
                dotfiles: "deny",
            });
        }



    } catch (err) {
        res.status(500).json({
            message: "An internal server error occurred.",
            err: err
        });
    }
});

module.exports = router;