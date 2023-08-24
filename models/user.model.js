const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:String,
    avatar:String,
    email:String,
    password:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}


/*

- Username
- Avatar (You can user a dummy avatar image URL)
- Email
- Password

*/