const router = require("express").Router();
const { Service, User, Booking } = require("../../models");
const withAuth = require("../../utils/auth");


router.post("/create", withAuth, async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.availability ||
            !req.body.industry ||
            !req.body.hourlyRate ||
            !req.body.description
        ) {
            res.render("error", {
                status: 400,
                message: "Please include a title, availability, industry, hourly rate and description",
                logged_in: req.session.logged_in,
            });
            return;
        }

        const validationObject = { ...req.body };

        // TODO: validation 

        const newService = await Service.create({ ...validationObject });

        if (!newService) {
            //Render the error page and pass the message back
            res.render("error", {
                status: 500,
                message: "Failed to create service",
                logged_in: req.session.logged_in,
            });
        } else {
            res.render("service", { id: newService.id });
        }

    } catch (err) {
        console.error(err);
        res.render("error", {
            status: 500,
            message: "An internal server error occurred ",
            logged_in: req.session.logged_in,
        });
    }

});

router.put("/update/:id", withAuth, async (req, res) => {
    try {
        const serviceToUpdate = await Service.findByPk(req.params.id);

        if (!serviceToUpdate) {

            res.render("error", {
                status: 404,
                message: `A service with ID ${req.params.id} does not exist`,
                logged_in: req.session.logged_in,
            });

            return;
        }

        if (serviceToUpdate.user_id != req.session.user_id) {
            res.render("error", {
                status: 401,
                message: `You are not authorised to modify service with ID ${req.params.id} as you are not the owner`,
                logged_in: req.session.logged_in,
            });

            //May want to actually recieve JSON back as it can then be displayed on a text box on the calling page
            // To discuss
            // res.status(401).json({
            //     message: "You are not authorised to modify this service post as it is not yours",
            // });
            return;
        }

        if (
            !req.body.title &&
            !req.body.availability &&
            !req.body.industry &&
            !req.body.hourlyRate &&
            !req.body.description
        ) {
            res.render("error", {
                status: 400,
                message: "Please include at least one updatable field in the request body of title, availability, industry, hourlyRate or description",
                logged_in: req.session.logged_in,
            });
            //Similar to above, we may want to actually respond with JSON 
            //To discuss
            // res.status(400).json({
            //     message: "Please include at least one updatable field in the request body of title, availability, industry, hourlyRate or description",
            // });
            return;
        }

        const validationObject = { ...req.body };

        //TODO: validation/sanitisation 

        await Service.update({ ...validationObject }, {
            where: {
                id: req.params.id,
            },
        });

        const serviceData = await Service.findByPk(req.params.id, {
            include: [{ model: Booking }]
        });

        const updatedService = serviceData.get({ plain: true });

        res.render("service", {
            updatedService,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err);
        res.render("error", {
            status: 500,
            message: "An internal server error occurred",
            logged_in: req.status.logged_in,
        });
    }


});

router.delete("/delete/:id", withAuth, async (req, res) => {
    // This simply deletes the service record however we may want to mark it as deleted so that we can:
    // #1 - Keep track of Services listed with the platform
    // #2 - Inform users about the fact that a booking they have made is no longer going to be served
    // This could simply be done with a boolean field against the value in the database and would be somewhat trivial to implement. 
    //When listing the avaialble services to book, we would then be searching for values where the "active" boolean is set to true
    //To discuss
    try {
        const serviceToDelete = Service.findByPk(req.params.id);
        if (!serviceToDelete) {
            res.status(404).json({
                message: "No service with that ID exists",
            });
            return;
        }

        await Service.destroy({
            where: {
                id: req.params.id,
            }
        });

        res.status(200).json({
            message: "Service successfully deleted",
        });

    } catch (err) {
        console.error(err);
        res.render("error", { message: "An internal server error occurred " });
    }
});

module.exports = router;