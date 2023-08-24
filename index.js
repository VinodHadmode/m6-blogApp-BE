const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.route")
const { blogRouter } = require("./routes/blog.routes")
require("dotenv").config()
var cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api",userRouter)
app.use("/api/blogs",blogRouter)

app.listen(process.env.PORT || 8080, async () => {
    try {
        await connection
        console.log("Connected to DB!!");
    } catch (error) {
        console.log(error);
        console.log("Someting went wrong while connecting to DB!!");
    }
    console.log("Server is running on 8080 port");
})