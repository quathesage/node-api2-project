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
      const { id } = await Post.insert({ title, contents })
      const newPost = await Post.findById(id)
      res.status(201).json(newPost)
    }
  } catch {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { title, contents } = req.body
  try {
    const checkId = await Post.findById(id)

    if (checkId === undefined) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" })
    } else if (!title || !contents) {
      return res
        .status(400)
        .json({ message: "Please provide title and contents for the post" })
    }

    await Post.update(id, { title, contents })
    const post = await Post.findById(id)
    res.status(201).json(post)
  } catch {
    res
      .status(500)
      .json({ message: "The post information could not be modified" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deletePost = await Post.findById(id)

    if (!deletePost) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" })
    } else {
      res.json(deletePost)
      await Post.remove(id)
    }
  } catch {
    res.status(500).json({ message: "The post could not be removed" })
  }
})

module.exports = router
