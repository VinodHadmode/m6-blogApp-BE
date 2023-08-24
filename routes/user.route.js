const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.model")


const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { username, avatar, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (hash) {
                const user = new UserModel({ username, avatar, email, password: hash })
                await user.save()
                res.status(200).json({ success: true, msg: "New user created!!", user })
            } else {
                res.status(400).json({ success: false, error: "Register failed" })
            }
        });

    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user._id, userName: user.name }, "masai")
                    if (token) {
                        res.status(200).json({ success: true, msg: "Logged In Successfully!!", token })
                    }else{
                        res.status(400).json({ success: false, error: "Wrong Credentials!!" })
                    }
                }else{
                    res.status(400).json({ success: false, error: "Wrong Credentials!!" })
                }
            });
        }else{
            res.status(400).json({ success: false, error: "User not found!!" })
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
})

module.exports = {
    userRouter
}

/*

{
  "username": "vinod",
  "avatar": "https://cdn-icons-png.flaticon.com/256/149/149071.png",
  "email": "vinod@gmail.com",
  "password": "vinod123"
}

*/