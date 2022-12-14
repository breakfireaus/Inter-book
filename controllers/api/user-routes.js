// http://url/api/user/*

const router = require("express").Router();
const { User, UserIndustry, Industry } = require("../../models");
const withAuth = require("../../utils/auth");


router.post("/create", async (req, res) => {
    try {
        // If the body is missing any one of these items, return
        if (
            !req.body.email ||
            !req.body.password ||
            !req.body.first_name ||
            !req.body.last_name
        ) {
            //This should be validated on the front end but I will leave it returning JSON here so that the message can be put in a text box 
            res.status(400).json({
                message: "Please check that all fields have been filled",
            });
            return;
        }

        const existingUser = await User.findAll({ where: { email: req.body.email } });

        if (existingUser.length > 0) {
            res.status(400).json({
                message: "A user with this email already exists",
            })
            return;
        }

        const { email, password, first_name, last_name } = req.body;

        //TODO: Likely need some validation/sanitisation here

        //Assumes industry is an ID value. This will need to change if we decide to make this n:M this will need to be changed
        const newUser = await User.create({
            email: email,
            password: password,
            last_name: last_name,
            first_name: first_name,
        });

        if (!newUser) {
            //logging can be expanded here to provide more information for troubleshooting
            console.err(`Failed to create new user with email: ${email}`);
            res.render("error", {
                status: 500,
                message: "An internal server error occurred",
                logged_in: req.session.logged_in,
            });
            return;
        } else {
            //If n:M relationship, logic for creating the n:M relationships goes here

            //Save the session details
            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.logged_in = true;
                
                res.status(201).json({
                    message: "successfully created user",
                });
            });
          
        }


    } catch (err) {
        console.error(err);
        res.render("error", {
            status: 500,
            message: "An internal server error occurred",
            logged_in: req.session.logged_in,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }

        //TODO: password check in user model. Method name may change

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            //If incorrect password
            res.status(401).json({
                message: "Incorrect email or password"
            });
            return;
        }


        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.status(200).json({
                message: "Logged in successfully",
            });
        });


    } catch (err) {
        // this may need to be removed after deployment to heroku.
        // According to the following link, stderr should print inside heroku to give us more infomation while debugging deployed code: 
        // https://devcenter.heroku.com/articles/logging
        console.error(err);

        res.status(500).json({
            message: "An internal server error occurred",
        });
    }

});


router.post("/logout", (req, res) => {
    try {
        // If session logged in then destroy the session, else return session not found.
        if (req.session.logged_in) {
            req.session.destroy(() => {
                //render the login page
                res.redirect("/signin");
            });
        } else {
            //session has already been destroyed by timeout or other mechanism
            res.redirect("/signin");
        }
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "An internal server error occurred",
        });

    }
});


router.put("/update", withAuth, async (req, res) => {
    try {
        // If request contains none of the updatable fields of password, description or industries
        // Industries expects an array of ID values
        if (
            !req.body.password &&
            !req.body.description &&
            !req.body.industries
        ) {
            //This validation will be done on the front end, returning JSON here so it can be displayed as a message 
            res.status(400).json({ message: "No updatable fields in request. Please include either a password, description or industry in request body" });
            return;
        }

        //Pull values off the body so they can be operated on for validation
        const validationObject = { ...req.body };

        //This is a quick and dirty way of creating new associations, this should be changed to a less destructive
        if (validationObject.industries) {
            await UserIndustry.destroy({ where: { user_id: req.session.user_id } });

            for (const industry of validationObject.industries) {
                await UserIndustry.create({ 
                    user_id: req.session.user_id, 
                    industry_id: industry,
                });
            }
        }


        //TODO: likely need input sanistiation here

        await User.update({ ...validationObject }, {
            where: {
                id: req.session.user_id,
            },
        });

        //TODO: get the valid information about the users profile 
        //Rerender the updated profile 
        res.redirect("/profile");

    } catch (err) {
        console.error(err);

        res.render("error", {
            status: 500,
            message: "An internal server error occurred",
            logged_in: req.session.logged_in,
        });
    }


});


module.exports = router;