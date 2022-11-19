const router = require("express").Router();
const { Service, User } = require("../../models");


router.post("/create", withAuth, async (req, res) => {
    try {
        if (
            !req.body.title || 
            !req.body.availability || 
            !req.body.industry ||
            !req.body.hourlyRate ||
            !req.body.description
        ) {
            res.status(400).json({
                message: "Please include all relevant fields in the body: title, availability, industry, hourlyRay, description"
            });
            return;
        }

        const validationObject = {...req.body};

        // TODO: validation 

        const newService = await Service.create({...validationObject});

        if(!newService){
            res.status(500).json({
                message: "An error occurred when creating a new service",
            });
        } else {
            res.status(201).json({
                message: "Service successfully created",
            });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An internal server error occurred",
        });
    }

});

router.put("/update/:id", withAuth, async (req, res) => {
    try{
        const serviceToUpdate = await Service.findByPk(req.params.id);

        if(!serviceToUpdate) {
            res.status(404).json({
                message: "A service with this ID does not exist",
            });
            return;
        }

        if(serviceToUpdate.user_id != req.session.user_id){
            res.status(401).json({
                message: "You are not authorised to modify this service post as it is not yours",
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

        const validationObject = {...req.body};

        //TODO: validation/sanitisation 

        await Service.update({...validationObject}, {
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({
            message: "Successfully updated service",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An internal server error occurred",
        });
    }


});

router.delete("/delete/:id", withAuth, async (req, res) => {

});