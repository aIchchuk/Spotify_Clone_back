import { clerkClient } from "@clerk/express";


export const protectRoute = async (req, res, next) => {
    try {
        if(!req.auth.userId){
            res.status(401).json({message: "Unauthorized - you must be logged in"});
            return;
        }
        
    } catch (error) {
        next();
    }
}

export const requireAdmin = async(req, res, next) => {
    try{
        const currentUser = await clerkClient.user.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;


        if(!isAdmin) {
            res.status(403).json({message: "Unauthorized - you must be an admin"})
        }

        next();
    } catch (errror) {
        next(error);
    }
    
}