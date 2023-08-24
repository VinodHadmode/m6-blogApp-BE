const express = require("express")
const { BlogModel } = require("../models/blog.model")
const { auth } = require("../middleware/auth.middleware")

const blogRouter = express.Router()

blogRouter.get("/", auth, async (req, res) => {
    //This endpoint should give all the blogs (only for the logged in users, use JWT token based authorisation)
    const { title, category } = req.query
    let query = {}
    try {
        if (title) {
            query.title = title
        }
        if (category) {
            query.category = category
        }
        const allBlogs = await BlogModel.find(query)
        res.status(200).json({ success: true, data: allBlogs })

    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
})

blogRouter.post("/", auth, async (req, res) => {
    //This endpoint should allow logged in user to create a new blog. (Use JWT Authorization)
    try {
        const blog = new BlogModel(req.body)
        await blog.save()
        res.status(200).json({ success: true, msg: "New blog created!!", blog })
    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
})

blogRouter.patch("/:id", auth, async (req, res) => {
    //This endpoint should allow the logged in user to edit or update his/her blog identified by its id.  (Use JWT Authorization)
    const userIDinUserDoc = req.body.userID
    const { id } = req.params
    const blog = await BlogModel.findOne({ _id: id })
    const blogIDinBlogDoc = blog.userID

    console.log("userIDinUserDoc", userIDinUserDoc);
    console.log("blogIDinBlogDoc", blogIDinBlogDoc);


    try {
        if (userIDinUserDoc === blogIDinBlogDoc) {
            const updatedBlog = await BlogModel.findByIdAndUpdate({ _id: id },req.body)
            res.status(200).json({ success: true, msg: "blog updated!!", updatedBlog })
        } else {
            res.status(400).json({ success: false, error: "Not Authorized!!" })
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }

})


blogRouter.delete("/:id", auth, async (req, res) => {
    //This endpoint should allow the logged in user to edit or update his/her blog identified by its id.  (Use JWT Authorization)
    const userIDinUserDoc = req.body.userID
    const { id } = req.params
    const blog = await BlogModel.findOne({ _id: id })
    const blogIDinBlogDoc = blog.userID

    console.log("userIDinUserDoc", userIDinUserDoc);
    console.log("blogIDinBlogDoc", blogIDinBlogDoc);


    try {
        if (userIDinUserDoc === blogIDinBlogDoc) {
            const deletedBlog = await BlogModel.findByIdAndDelete({ _id: id })
            res.status(200).json({ success: true, msg: "blog deleted!!", deletedBlog })
        } else {
            res.status(400).json({ success: false, error: "Not Authorized!!" })
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }

})



module.exports = {
    blogRouter
}


/*
{
    "id" : 1
    "username": "coreyschafer",
    "title": "Be Present",
    "content": "Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, .",
    "category" : "Entertainment",
    "date" : "2017-06-01",
    "likes" : 24,
    "comments" : [{username : "Jane", content : "Good One"}, {username : "Bob", content : "Loved It!"}]
  }

*/