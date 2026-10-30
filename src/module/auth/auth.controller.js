import { Router } from "express";
import { logIn, signUp } from "./auth.service.js";
import { successRes } from "../../common/response/success.res.js";
import { validi } from "../../middleware/valid.middle.js";
import { loginSchema, signupchema } from "./auth.valid.js";

export const userRouter=Router()
userRouter.post("/signup",validi(signupchema),async(req,res)=>{
    const result=await signUp(req.body)
    successRes({res,message:"created",data:result})
})
userRouter.post("/login",validi(loginSchema),async(req,res)=>{
    const result=await logIn(req.body)
    return res.status(200).json({data:result})
})