import * as z from "zod"
import { validFeilds } from "../../common/valid.common.js";
const loginBody=z.object({
    email:validFeilds.email,
    password:validFeilds.password

})
export const loginSchema=z.object({ 
    body:loginBody
});
export const signupchema=(lang)=>{
    return z.object({ 
    body:loginBody.extend({
        email:z.email({
            error:
                lang=="EN"
                ? "Email Must follow ex@domain.com "
                :"يجب ان يتبع هذا النمط e"
        }),
        userName:validFeilds.userName,
        confirmPaaword:z.string(),
        gender:validFeilds.gender,
        // phone:validFeilds.phone(),
    })
    }).refine((value)=> {
        return value.confirmPaaword===value.password
    },{error:"pass Not matched"} 

)}
export const updateSchema=z.object({ 
    body:loginBody.extend({
        userName:validFeilds.userName,
        phone:validFeilds.phone,
        gender:validFeilds.gender.optional(),
        DOB:z.date().optional(),
        confirmPaaword:z.string()
    }).refine((value)=> {
        return value.confirmPaaword===value.password
    },{erroe:"pass Not matched"})
})