const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]

    if(token){
        const decoded=jwt.verify(token,"masai")
        // console.log(decoded);
        if(decoded){
            req.body.userID=decoded.userID;
            req.body.date=new Date().toISOString()
            next()
        }else{
            res.status(400).json({ success: false, error: "Cant decode token,Login again!!" })
        }
    }else{
        res.status(400).json({ success: false, error: "Token not recieved,Login again!!" })
    }
}


module.exports={
    auth
}