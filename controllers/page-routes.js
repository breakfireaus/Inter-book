const router = require("express").Router();
const withAuth = require("../utils/auth");


router.get("/", withAuth, (req, res)=>{
    res.render("dashboard");
});

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.get("/register", (req, res) => {
    res.render("register");
})


module.exports = router;