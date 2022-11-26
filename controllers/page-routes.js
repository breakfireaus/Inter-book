const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get ('/', withAuth, async(req,res )=>
{
    //todo: render homepage if not signed in login page
}
) 

router.get("/", withAuth, (req, res)=>{
    res.render("dashboard");
});

router.get("/login", (req, res) => {
    res.render("signin");
});

router.get("/register", (req, res) => {
    res.render("register");
})

module.exports = router;