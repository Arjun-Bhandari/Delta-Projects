const User = require("../models/user");

module.exports.renderSignUpForm = async(req,res)=>{
    res.render("./users/signup.ejs");
};


module.exports.signup = async (req,res,next)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email,username});
        let registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
        req.flash("success","welcome to wanderlust");
        res.redirect("/listings");
        });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = async(req,res)=>{
    res.render("./users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome Back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    };


    module.exports.logout = (req,res,next)=>{
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","You Logged Out!!");
            res.redirect("/listings");
        });
        };