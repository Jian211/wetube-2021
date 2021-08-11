import multer from "multer";

export const localsMiddleware = (req,res,next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    res.locals.siteTitle = "wetube";
    next();
}

export const protectMiddleware = (req,res,next) =>{
    if(req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/login");
    }
}

export const publicMiddleware = (req,res,next) =>{
    if(!req.session.loggedIn){
        return next();
    }else{
        res.redirect("/")
    }
}

export const avataUpload = multer({dest: "uploads/avata",limits: 1000000});

export const videoUpload = multer({dest : "uploads/video",limits : 10000000});