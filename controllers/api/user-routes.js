const router = require("express").Router();
const { User } = require("../../models");


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

        //TODO: Update once a decision has been made on industries - currently setup for n:M
        // const industries = UserIndustry.findAll({where: { user_id: req.session.user_id}}); 

        // for(const industry of industries){
        //     //Do something
        // }


        //TODO: likely need input sanistiation here

        // User hook should hash the password before update
        //TODO: test the functionality of password hashing via hook. This may need for the hook to be explicitly called.
        await User.update(req.body, {
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