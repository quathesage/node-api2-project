// implement your server here
// require your posts router and connect it here
const express = require("express")
const postRouter = require("./posts/posts-router")

const server = express()

server.use(express.json())
server.use("/api/posts", postRouter)

server.use("*", (req, res) => {
  res.status(404).send(`
    <h2>Post Api</h2>
  `)
})

module.exports = server
