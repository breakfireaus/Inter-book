//Currently these routes return information in JSON to the invoker, this can farily easily be switched to render pages server side if we want to go down that path also. 

const router = require("express").Router();
const { User, Industry } = require("../../models");


router.post("/create", async (req, res) => {
    try {
        // If the body is missing any one of these items, return
        if (
            !req.body.email ||
            !req.body.password ||
            !req.body.description ||
            !req.body.industry
        ) {
            res.status(400).json({
                message: "Please include email, password, description and industry in request body",
            });
            return;
        }

        const existingUser = User.findAll({ where: { email: req.body.email }});

        if (existingUser){
            res.status(400).json({
                message: "A user with this email already exists",
            });
            return;
        }

        const { email, password, description, industry } = req.body;

        //TODO: Likely need some validation/sanitisation here

        //Assumes industry is an ID value. This will need to change if we decide to make this n:M this will need to be changed
        const newUser = await User.create({
            email: email,
            password: password,
            description: description,
            industry: industry,
        });

        if (!newUser){
            res.status(500).json({
                message: "Something went wrong in user creation",
            });
            return;
        } else {
            //If n:M relationship, logic for creating the n:M relationships goes here
            res.status(201).json({
                message: "User successfully created",
            });
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An internal server error occurred",
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
            res.status(400).json({ message: "Incorrect email or password" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        });

        //May need to return some information to the front end. This will need to be sanitised from the userData object as this should not be returned in raw format to the front end.
        res.status(200).json({ message: "Logged in successfully" });
    } catch (err) {
        // this may need to be removed after deployment to heroku.
        // According to the following link, stderr should print inside heroku to give us more infomation while debugging deployed code: 
        // https://devcenter.heroku.com/articles/logging
        console.error(err);

        res.status(500).json({ message: "An internal server error occurred" });
    }

});


router.post("/logout", (req, res) => {
    try {
        // If session logged in then destroy the session, else return session not found.
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.error(err);

        res.status(500).json({ message: "An internal server error occurred" });

    }
});


router.put("/update", withAuth, async (req, res) => {
    try {
        // If request contains none of the updatable fields of password, description or industry
        if (
            !req.body.password &&
            !req.body.description &&
            !req.body.industry
        ) {
            res.status(400).json({ message: "No updatable fields in request. Please include either a password, description or industry in request body" });
            return;
        }

        //Pull values off the body so they can be operated on for validation
        const validationObject = {...req.body};

        //TODO: Update once a decision has been made on industries - currently setup for n:M
        // const industries = UserIndustry.findAll({where: { user_id: req.session.user_id}}); 

        // for(const industry of industries){
        //     //Do something
        // }


        //TODO: likely need input sanistiation here

        // User hook should hash the password before update
        //TODO: test the functionality of password hashing via hook. This may need for the hook to be explicitly called.
        // This will also need to be changed if we decide to make industry a n:M relationship
        await User.update({...validationObject}, {
            where: {
                id: req.session.user_id,
            },
        });

        res.status(200).json({
            message: "Successfully updated user details",
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({ message: "An internal server error occured" });
    }


});


module.exports = router;