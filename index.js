const express = require("express")
const { initializeDatabase } = require("./config/database")
const Post = require("./models/post")

const app = express()

app.use(express.json())

// Initialize and synchronize the database, then start the server
const port = 2020
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
})

app.get("/", (req, res) => {
  res.send("Hello world!")
})

// Create post
app.post("/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body)
    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: error.message })
  }
})

// Get a post by id
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: "Post not found!" })
    }

    res.status(200).json({ post })
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: error.message })
  }
})

// Update post data
app.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: "Post not found!" })
    }

    await post.update(req.body)

    res.json(post)
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: error.message })
  }
})

// Delete post by id
app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: "Post not found!" })
    }

    await post.destroy()

    res.status(200).json({ msg: "Post deleted successfully!" })
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: error.message })
  }
})
