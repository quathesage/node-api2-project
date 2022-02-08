// implement your posts router here
const router = require("express").Router()
const Post = require("./posts-model")

router.get("/", async (req, res) => {
  try {
    const post = await Post.find()
    res.json(post)
  } catch {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" })
    } else {
      res.json(post)
    }
  } catch {
    res
      .status(500)
      .json({ message: "The post information could not be retrieved" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body
    if (!title || !contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" })
    } else {
      const newPost = await Post.insert({ title, contents })
      res.status(201).json(newPost)
    }
  } catch {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    })
  }
})

module.exports = router
