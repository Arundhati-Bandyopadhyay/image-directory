const express=require("express");
const router=express.Router();
var usercntrl=require('../controller/userController')
var usercntrlN=require('../controller/photoController')
var isauth=require('../middleware/auth')

router.get('/', function(req, res, next) { 
    res.render('index') 
})

router.get('/imageupload', function(req, res, next) { 
    res.render('imageupload') 
})


router.route("/register",isauth).post(usercntrl.postUsers).get(function(req, res, next) { 
    res.render('register') 
})

router.route("/login",isauth).post(usercntrl.loginUser,).get(function(req, res, next) { 
    res.render('login') 
})
router.route("/imageupload").post(usercntrlN.uploadPhotos).get(function(req, res, next) { 
    res.render('imageupload') 
})

router.route("/del/:id").delete(usercntrl.deleteUser)
router.route("/update/:id").put(usercntrl.updateUser)




module.exports=router;