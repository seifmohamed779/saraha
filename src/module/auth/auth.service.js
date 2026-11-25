import CryptoJS from"crypto-js"
import { createDoc, findOneDoc } from "../../DB/db.repo.js"
import { userModel } from "../../DB/model/user.model.js"
import { compareHash, hashValue } from "../../common/secure/hash.js"
import { HashTollEnum } from "../../common/enum/hash.enum.js"
import { createLoginTokens } from "../../common/secure/token.secure.js"
import { GenOTP } from "../../common/otp/otp.js"
import { sendEmail } from "../../common/utils/email/email.services.js"
import { getValue, setValue } from "../../common/cache.js"
// import { JWT_ACCESS_EXPIRES_IN, JWT_USER_ACCESS_SIGNUTURE, JWT_REFRESH_EXPIRES_IN, JWT_USER_REFRESH_SIGNUTURE } from "../../config/config.js"



export async function signUp(userData) {
    const{email}=userData
    const userEmail=await findOneDoc({model:userModel,filter:{email}})
    if(userEmail){
        throw new Error("email is exist")
    }
    userData.password=await hashValue({value:userData.password,
        tool:HashTollEnum.argon
    })
    userData.phone= CryptoJS.AES.encrypt(userData.phone,"secret Key 123").toString() //زي اكنك بتخفي الرقم
    const newUser=await createDoc({model:userModel ,insertedData:userData})
    const ConfirmOTP=GenOTP()
    await sendEmail({to:email,subject:"Confirm email",html:`<h1>OTP IS ${ConfirmOTP}<h1>`})
    await setValue({key:`user::${email}::confirmEamil`,value:await hashValue({value:ConfirmOTP})})
    console.log("5 - Email sent");
    return newUser; 
}
export async function confirmEmail(bodyData) {
    const{email,OTP}=bodyData
    const user=await findOneDoc({
        model:userModel,
        filter:{email,confirmEmail:false}
    })
    if(!user){
        throw new Error("Invalid Account");
    }
    const hashedOTP=await getValue(`user::${email}::confirmEamil`)
    if(!hashedOTP){
        throw new Error("invalid OTP");
        
    }
    const isOTPValid=await compareHash({value:OTP,hash:hashedOTP})
    if(!isOTPValid){
        throw new Error("in correct OTP");
    }
    user.confirmEmail=true
    await user.save()
}



export async function logIn(userData) {
    const{email,password}=userData
    const user=await findOneDoc({model:userModel,filter:{email}})
    if(!user){
        throw new Error("email not exist or password")
    }
    const isMatch = await compareHash({
        value: password,
        hash: user.password,
        tool: HashTollEnum.argon
    });
        if (!isMatch) {
        console.log("err in pass");
        throw new Error("email not exist or password");
    }
    return createLoginTokens({user})
}