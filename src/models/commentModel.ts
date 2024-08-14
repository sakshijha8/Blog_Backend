const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  username:{
    type:mongoose.Schema.ObjectId,
  },
  userId: {
    type:mongoose.Schema.ObjectId,
  },
  postId: {
    type:mongoose.Schema.ObjectId,
  }
});

const commentModel = new mongoose.model("commentModel", commentSchema);
export { commentModel };

