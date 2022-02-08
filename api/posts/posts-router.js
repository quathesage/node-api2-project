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

module.exports = router
