import { Router } from "express";  
import { successRes } from "../../common/response/success.res.js";
// import jwt from "jsonwebtoken";
import { auth } from "../../middleware/authentic.middle.js";
import { TokenType } from "../../common/enum/token.enum.js";
import { logout, rotateToken } from "./user.services.js";
import { authorization } from "../../middleware/authoriz.middle.js";
import { AcceptTypedEnum, AccessEnum } from "../../common/enum/user.enum.js";
import upload from "../../common/utils/multer/multer.config.js";
const userrouter=Router() 
userrouter.get("/get-profile",auth(),authorization(AccessEnum.ADMIN),async(req,res)=>{

successRes({res,data:{user:req.user},payload:req.payload}) 
})
userrouter.get("/rotate-token",auth(TokenType.REFRESH),async(req,res)=>{
    const result= await rotateToken (req.payload)
successRes({res,data:result}) 
})
userrouter.post("/profile-pic",upload({fileTypes:AcceptTypedEnum.image,fileSize:4}).single("profile-pic"),
async(req,res)=>{
    successRes({res,data:{"req.body":req.body,"req.file":req.file,"req.files":req.files}})
}
)
userrouter.post("/logout",auth(TokenType.REFRESH),async(req,res)=>{
    const result= await logout (req.payload)
    successRes({res,data:result}) 
})
export default userrouter;
