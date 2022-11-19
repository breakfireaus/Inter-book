const router = require("express").Router();
const { Service, User } = require("../../models");


router.post("/create", withAuth, async (req, res) => {

});

router.put("/update/:id", withAuth, async (req, res) => {
    const serviceToUpdate = await Service.findByPk(req.params.id);

    if(!serviceToUpdate) {
        res.status(404).json({
            message: "A service with this ID does not exist",
        });
    }

    if(serviceToUpdate.user_id != req.session.user_id){
        res.status(401).json({
            message: "You are not authorised to modify this service post as it is not yours",
        });
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



});

router.delete("/delete/:id", withAuth, async (req, res) => {

});