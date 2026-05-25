const express = require("express");

const router = express.Router();

const Post = require("../models/Post");

const auth = require("../middleware/auth");



// ================= CREATE POST =================

router.post("/", auth, async(req,res)=>{

  try{

    const post = new Post({

      title:req.body.title,

      content:req.body.content,

      image:req.body.image,

      category:req.body.category,

      author:req.user.id,

      comments:[]

    });

    await post.save();

    const populatedPost =
      await Post.findById(post._id)

      .populate("author","username");

    res.json(populatedPost);

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message
    });

  }

});



// ================= GET ALL POSTS =================

router.get("/", async(req,res)=>{

  try{

    const posts =
      await Post.find()

      .populate("author","username")

      .sort({
        createdAt:-1
      });

    res.json(posts);

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message
    });

  }

});



// ================= MY POSTS =================

router.get("/my/posts", auth, async(req,res)=>{

  try{

    const posts =
      await Post.find({

        author:req.user.id

      })

      .populate("author","username")

      .sort({
        createdAt:-1
      });

    res.json(posts);

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message
    });

  }

});



// ================= SINGLE POST =================

router.get("/:id", async(req,res)=>{

  try{

    const post =
      await Post.findById(
        req.params.id
      )

      .populate("author","username");

    if(!post){

      return res.status(404).json({
        message:"Post not found"
      });

    }

    res.json(post);

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message
    });

  }

});



// ================= DELETE POST =================

router.delete("/:id", auth, async(req,res)=>{

  try{

    const post =
      await Post.findById(
        req.params.id
      );

    if(!post){

      return res.status(404).json({
        message:"Post not found"
      });

    }

    if(
      post.author.toString()
      !==
      req.user.id
    ){

      return res.status(401).json({
        message:"Unauthorized"
      });

    }

    await Post.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:"Blog Deleted"
    });

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message
    });

  }

});



// ================= ADD COMMENT =================

router.post(
  "/comment/:id",
  auth,
  async(req,res)=>{

    try{

      const post =
        await Post.findById(
          req.params.id
        );

      if(!post){

        return res.status(404).json({
          message:"Post not found"
        });

      }

      const newComment = {

        text:req.body.text,

        username:req.user.username,

        user:req.user.id

      };

      post.comments.push(
        newComment
      );

      await post.save();

      const updatedPost =
        await Post.findById(
          req.params.id
        )

        .populate(
          "author",
          "username"
        );

      res.json(updatedPost);

    }catch(error){

      console.log(error);

      res.status(500).json({
        message:error.message
      });

    }

  }
);



// ================= DELETE COMMENT =================

router.delete(
  "/comment/:postId/:commentId",
  auth,
  async(req,res)=>{

    try{

      const post =
        await Post.findById(
          req.params.postId
        );

      if(!post){

        return res.status(404).json({
          message:"Post not found"
        });

      }

      post.comments =
        post.comments.filter(

          (comment)=>

            comment._id.toString()
            !==
            req.params.commentId

        );

      await post.save();

      res.json({
        message:"Comment Deleted"
      });

    }catch(error){

      console.log(error);

      res.status(500).json({
        message:error.message
      });

    }

  }
);



module.exports = router;