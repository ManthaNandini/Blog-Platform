const express = require("express");

const Comment = require("../models/Comment");

const auth = require("../middleware/auth");

const router = express.Router();


// ADD COMMENT

router.post("/:postId", auth, async (req, res) => {

  const comment = new Comment({
    text: req.body.text,
    user: req.user.id,
    post: req.params.postId
  });

  await comment.save();

  res.json(comment);
});


// GET COMMENTS

router.get("/:postId", async (req, res) => {

  const comments =
    await Comment.find({
      post: req.params.postId
    }).populate("user", "username");

  res.json(comments);
});

module.exports = router;