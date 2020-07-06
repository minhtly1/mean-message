const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://minh:Deadflame1@cluster0.eej36.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed!')
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Handle CORS errors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    console.log(post);
    post.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get("/api/posts", (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched succesfully!',
            posts: documents
        });
    });
})

module.exports = app;