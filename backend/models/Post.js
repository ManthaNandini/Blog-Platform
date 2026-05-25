const mongoose = require("mongoose");

const commentSchema =
  new mongoose.Schema({

    text:{
      type:String
    },

    username:{
      type:String
    },

    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }

  },
  {
    timestamps:true
  }
);

const postSchema =
  new mongoose.Schema({

    title:{
      type:String,
      required:true
    },

    content:{
      type:String,
      required:true
    },

    image:{
      type:String
    },

    category:{
      type:String,
      default:"Technology"
    },

    author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },

    comments:[commentSchema]

  },
  {
    timestamps:true
  }
);

module.exports =
  mongoose.model(
    "Post",
    postSchema
  );