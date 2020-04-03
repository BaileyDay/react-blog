const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

app.use(cors());
app.use(express.json());

//ROUTES//

//Create Post
app.post("/posts", async (req, res) => {
    try {
        const { post_body } = req.body;
        const newPost = await pool.query("INSERT INTO posts (post_body) VALUES ($1) RETURNING *", [post_body])
        res.json(newPost.rows[0])
    } catch (error) {
        console.error(err.message)
    }
})
//Edit Post

app.put("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { post_body } = req.body;
        const updatePost = await pool.query("UPDATE posts SET post_body = $1 WHERE id = $2", [post_body, id])
        res.json("Post was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//Delete Post

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM posts WHERE id = $1", [
            id
        ]);
        res.json("Post was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

//Get all posts

app.get("/posts", async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM posts")
        res.json(allPosts.rows)

    } catch (error) {
        console.error(err.message)
    }
})

//Get a Post

app.get("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [
            id
        ]);
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3001, () => {
    console.log("Server has started on port 3001")
})

