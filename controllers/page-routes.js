const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get ('/', withAuth, async(req,res )=>
{
    //todo: render homepage if not signed in login page
}
) 

//profile

//register


module.exports = router;