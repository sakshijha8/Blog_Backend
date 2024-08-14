const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
      type: String,
      required:true
    },
    content:{
      type:String,
      required:true
    },
    userId:{
      type:mongoose.Schema.ObjectId
    },  
    likes:[{
      type:mongoose.Schema.ObjectId
    }],
    dislikes:[{
      type:mongoose.Schema.ObjectId
    }],
    commentId:[{
      type:mongoose.Schema.ObjectId
    }]
  },
  {
    timestamps: true,
  }
);

const postModel = new mongoose.model("postModel", postSchema);
export { postModel };
