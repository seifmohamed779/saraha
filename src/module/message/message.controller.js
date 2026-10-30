import { Router } from "express";
import { auth } from "../../middleware/authentic.middle";
import upload from "../../common/utils/multer/multer.config";

const messsageRouter=Router()
messsageRouter.post("/send",auth(),
upload({multer}))


export default messsageRouter