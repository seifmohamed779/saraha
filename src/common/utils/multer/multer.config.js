import multer from "multer"
import {mkdir} from"fs/promises"
import { randomUUID } from "crypto"


const upload=({fileTypes=[],fileSize=5})=>{
    return multer({dest:"./assets",storage:multer.diskStorage({
    destination:async(req,file,cb)=>{
        const folder="./assets"
        await mkdir(folder,{recursive:true})
        cb(null,folder)
    },
    filename:(req,file,cb)=>{
        cb(null,randomUUID()+file.originalname)
    }
}),
fileFilter:(req,file,cb)=>{
if(!fileTypes.includes(file.mimetype)){
    cb(new Error("invalid type file"))
    return
}
    cb(null,true)
},
limits:{fileSize:fileSize*1024*1024}
})
}
export default upload