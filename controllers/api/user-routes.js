const router = require("express").Router();
const { route } = require(".");
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

