import { createDoc, findById } from "../../DB/db.repo.js";
import messageModel from "../../DB/model/message.model.js";
import { userModel } from "../../DB/model/user.model.js";

export async function sendMessage(bodyData,fileData,user) {
    const {content,receiverId}=bodyData
    const receiver=await findById({model:userModel,id:receiverId})
    if(!receiver){
        throw new Error("Reciever Not found");  
    }
    console.log({fileData});
    
    return await createDoc({model:messageModel,insertedData:{
        content,
        receiverId,
        senderId:user?._id
    }})
}