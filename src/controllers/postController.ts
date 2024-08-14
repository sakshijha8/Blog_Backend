import { Request, Response } from "express";
import { postModel } from "../models/postModel";
import { v2 as cloudinary } from "cloudinary";
import { userModel } from "../models/userModel";
import { commentModel } from "../models/commentModel";
// Configuration
cloudinary.config({
  cloud_name: "dtld3eg9h",
  api_key: "567168252772482",
  api_secret: "h0WANHCGEXvP68aUeI93nuFD05w",
});

export const postImage = async (req: Request, res: Response) => {
  try {

    const user = await userModel.findById(req.body.payload);
    let data = req.body;
    const file: any = req.file;
    const upload = await cloudinary.uploader.upload(file?.path);

    let postData = await postModel.create({
      title: data.title,
      description: data.description,
      images: upload.url,
      username : user?.id,
      content : data.content
    });
    if (!postData) throw new Error("Post not created");
    res.status(200).send(postData);
  } catch (err: any) {
    res.json({
      message: err.message,
    });
  }
};
// Update Post 
export const updatePost = async (req: Request, res: Response) => {
  try {
    const dataToUpdate = req.body;
    const id = req.params.id;
    const post = await postModel.findById(id);
    const keys: any = [];
    for (let key in dataToUpdate) {
      keys.push(key);
    }
    //console.log(keys);
    for (let i = 0; i < keys.length; i++) {
      post[keys[i]] = dataToUpdate[keys[i]];
    }

    let updated = await post.save();
    return res.json({
      message: "Post updated Successfully",
      Data: updated,
    });
  } catch (err: any) {
    res.json({
      message: err.message,
    });
  }
};

// Get all Posts
export const getPosts = async (req: Request | any, res: Response) => {
  try {
    const username = req.username
    console.log("uername",username)
    const userposts = await postModel.find({}).sort({ _id: -1 });
    if (!userposts) throw new Error("Not found");
    res.status(200).send(userposts);
  } catch (error: any) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// Delete Post
export const deletePost = async(req: Request, res: Response)=>{
  const id = req.params.id;
  let blog;
  try{
    blog = await postModel.findByIdAndRemove(id)
  }
  catch(err:any){
   console.log(err.message)
  }
  if(!blog){
    return res.status(500).json({message:"Unable to Delete Post"})
  }
  return res.status(200).json({message : "Post Deleted Successfully!"})
}

// Create Comment
export const createComment=async(req:Request | any, res:Response)=>{
  try{
   let post = await postModel.findById(req.body.postId)
   let comment = await commentModel.create({
     comment:req.body.comment ,
     userId:req.id ,
     postId:req.body.postId  
   })
   post.commentId=comment.id
   post.save()
   return res.json({
     message:'Comment added',
     comment:comment
   })
  }catch(err:any){
   return res.json({
     message:err.message
   })
  }
}
export const getContent= async (req: Request, res: Response) => {
  try {
   let id =req.params.id
    let post =await postModel.findById(id)
    return res.json({
      data:post
    })
    } catch (err: any) {
      console.log(err)
      res.json({
        message: err.message,
      });
    }
  }
export const getComment=async(req:Request | any, res:Response)=>{
 let postId=req.params.postid;
 let username = req.params.username;
 let comment=await commentModel.find({postId:postId,username:username})
 return res.json({
   message:'Comment list',
   data:comment
 })
}
// Likes on Post
export const likePost = async (req: Request | any, res: Response) => {
  try {
    const userId=req.id;
    let postId=req.body.postId;
    console.log(userId)
    let post=await postModel.findById(postId)
    if(post.likes.includes(userId)){
      post.likes.remove(userId)
    }else{
     post.likes.push(userId)
     post.dislikes.remove(userId)
    }
     await post.save()
    return res.json({
      data:post.likes
    })
    } catch (err: any) {
      res.json({
        message: err.message,
      });
    }
}
// Dislikes on Post
export const dislikePost = async (req: Request | any, res: Response) => {
try {
   
   const userId=req.id;
   let postId=req.body.postId;
   console.log(userId)
   let post=await postModel.findById(postId)
   if(post.dislikes.includes(userId)){
     post.dislikes.remove(userId)
   }else{
    post.dislikes.push(userId)
    post.likes.remove(userId)
   }
   await post.save()
  return res.json({
    data:post.dislikes
  })
  } catch (err: any) {
    res.json({
      message: err.message,
    });
  }
}

