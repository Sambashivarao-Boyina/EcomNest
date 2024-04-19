const express=require("express");
const wrapAsync = require("../util/wrapAsync");
const { userSignUp, accessRoute, userSignIn, refreshToken } = require("../controllers/auth");
const router=express.Router();

router.post("/user-signup",wrapAsync(userSignUp));
router.post("/user-signin",wrapAsync(userSignIn));

router.get("/refreshToken",wrapAsync(refreshToken));
router.get("/accessRoute",accessRoute);



module.exports=router;