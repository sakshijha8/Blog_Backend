import { v2 as cloudinary } from "cloudinary";
import {Request ,Response} from 'express'
cloudinary.config({
    cloud_name: "dtld3eg9h",
    api_key: "567168252772482",
    api_secret: "h0WANHCGEXvP68aUeI93nuFD05w",
  });

export const imageHandler=async (req:Request | any,res:Response)=>{
    try{
       let file= req.file.path
       const result = await cloudinary.uploader.upload(file)
       if(result){
        res.json(result?.url)
       }
       }catch(err:any){
        res.json(err.message)
       }
}
