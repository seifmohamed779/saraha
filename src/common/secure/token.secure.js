import jwt from "jsonwebtoken"
import { JWT_ACCESS_EXPIRES_IN, JWT_USER_ACCESS_SIGNUTURE, JWT_REFRESH_EXPIRES_IN, JWT_USER_REFRESH_SIGNUTURE, JWT_ADMIN_ACCESS_SIGNUTURE, JWT_ADMIN_REFRESH_SIGNUTURE } from "../../config/config.js"
import { AccessEnum } from "../enum/user.enum.js"
import { TokenType } from "../enum/token.enum.js"
import { findOneDoc } from "../../DB/db.repo.js"
import { userModel } from "../../DB/model/user.model.js"
import {randomUUID} from"node:crypto"

export function signToken({payload={},signture,options}) {
return jwt.sign(payload,signture,options)
}
export function verifyToken({token,signture}={}) {
return jwt.verify(token,signture)
}
export function decodeToken(token) {
return jwt.decode(token)
}
export function GetSign(userRole=AccessEnum.USER) {
    let signtures={}; 
    switch (userRole) {
        case AccessEnum.USER:
            signtures.ACCESS_token=JWT_USER_ACCESS_SIGNUTURE
            signtures.REFRESH_token=JWT_USER_REFRESH_SIGNUTURE
            break;
        case AccessEnum.ADMIN:
            signtures.ACCESS_token=JWT_ADMIN_ACCESS_SIGNUTURE
            signtures.REFRESH_token=JWT_ADMIN_REFRESH_SIGNUTURE
            break;
    
        default:
            break;
    }
    return signtures
}

export function createLoginTokens({user,options,refreshExpIn=JWT_REFRESH_EXPIRES_IN}={}) {
    const {
        ACCESS_token: access_signuture,
        REFRESH_token: refresh_signuture
    } = GetSign(user.role)  
    console.log({
    userRole: user.role,
    accessSecretExists: !!access_signuture,
    refreshSecretExists: !!refresh_signuture
});
const jwtid=randomUUID()
const ACCESS_token=signToken({signture:access_signuture,
    options:{
        ...options,
        expiresIn:JWT_ACCESS_EXPIRES_IN,
        subject:user.id,
        audience:[user.role],
        jwtid
    },
})
const REFRESH_token=signToken({signture:refresh_signuture, 
    options:{
        ...options,
        expiresIn:refreshExpIn,
        audience:[user.role],
        subject:user.id,
        jwtid
    }, 
})
console.log({
    accessTokenCreated: !!ACCESS_token,
    refreshTokenCreated: !!REFRESH_token
});
return {ACCESS_token,REFRESH_token}
}
export async function checkToken({token,tokenType}={}) {
    const payload=decodeToken(token)
    if (!payload.aud.length) {
        throw new Error("old token data, try again");
    }
        if(!payload.sub){
        throw new Error("NOT found sub");
        
    }
        const {
    ACCESS_token: access_signuture,
    REFRESH_token: refresh_signuture} = GetSign(payload.aud[0])
    console.log({
    tokenType,
    selectedSecret: tokenType == TokenType.ACCESS
        ? "ACCESS"
        : "REFRESH",
    audienceRole: payload.aud[0]
});
    console.log({
    tokenType,
    audience: payload.aud,
    subject: payload.sub,
    hasUserAccessSecret: !!JWT_USER_ACCESS_SIGNUTURE,
    hasUserRefreshSecret: !!JWT_USER_REFRESH_SIGNUTURE
});
    jwt.verify(
        token,
        tokenType==TokenType.ACCESS
        ? access_signuture
        : refresh_signuture
    );
    const user=await findOneDoc({model:userModel,id:payload.sub})
    if(!user){
        throw new Error("Not found id");
    }
    return{user,payload}
}