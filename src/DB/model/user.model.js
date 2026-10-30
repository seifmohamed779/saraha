import mongoose from "mongoose";
import { AccessEnum, GenderEnum } from "../../common/enum/user.enum.js";
export const userSchema=new mongoose.Schema({
    firstName:{
    type:String,
    minlength:2,
    maxlength:16,
    required:true
    },
    lastName:{
    type:String,
    minlength:2,
    maxlength:16,
    required:true
    },
    email:{
    type:String,
    lowerCase:true,
    required:true,
    trim:true,
    unique:true,
    },
    password:{
    type:String,
    required:true
    },
    phone:{
    type:String,
    },
    role:{
    type:Number,
    enum:Object.values(AccessEnum),
    default:AccessEnum.USER
    },
    gender:{
    type:Number,
    enum:Object.values(GenderEnum),
    default:GenderEnum.MALE
    },
    DOB:{
    type:Date
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    profilePic:String,
    coverPic:[String],
    DeletedAt:Date,
    changeTime:Date
},
{
    timestamps:true,
    optimisticConcurrency:true,
    toJSON:{
        virtuals:true
    }
})
userSchema.virtual("userName").get(function(){
    return `${this.get("firstName")}${this.get("lastName")}`
})
userSchema.virtual("userName").set(function(value){
    const[firstName,lastName]=value.split(" ")
    this.set({firstName,lastName})
})
export const userModel=mongoose.model("Users",userSchema)