const express = require("express");

const router = express.Router();

const BlogPost = require("../models/blogPost");

//routes // app  ko router se replace kardiya
router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      console.log("data", data);
      res.send(data);
    })
    .catch((error) => {
      console.log("error", daerrorta);
    });
});

// yaha ab post request banayenge  jo humne form mein dala hai ki post karo...uska url kasie pata chalega
router.post("/save", (req, res) => {
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  // .save
  newBlogPost.save((error) => {
    if (error) {
      res.status(500).send({msg: 'sorry,internal server errors'})
      return;
    } 
    // BlogPost
    return res.send({
      msg: "we received ur data and saved"
    });
  });
});

router.get("/name", (req, res) => {
  const data = {
    username: "pulast",
    age: 5,
  };
  res.send(data);
});

module.exports = router;
