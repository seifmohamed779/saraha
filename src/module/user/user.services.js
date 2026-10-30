import { setValue } from "../../common/cache.js";
import { createLoginTokens } from "../../common/secure/token.secure.js";
import { JWT_ACCESS_EXPIRES_IN, JWT_USER_ACCESS_SIGNUTURE, JWT_REFRESH_EXPIRES_IN, JWT_USER_REFRESH_SIGNUTURE } from "../../config/config.js"
import jwt from "jsonwebtoken"
import { findOneDoc } from "../../DB/db.repo.js";
import { userModel } from "../../DB/model/user.model.js";
import { logoutAc } from "../../common/enum/user.enum.js";
export async function rotateToken(payload) {
    const user = await findOneDoc({
        model: userModel,
        id: payload.sub
    });

    if (!user) {
        throw new Error("User not found");
    }

    const tokenExpireDate = payload.exp;
    const currentDate = Math.floor(Date.now() / 1000);
    const consumedTime = currentDate - payload.iat;

    if (tokenExpireDate <= currentDate) {
        throw new Error("Refresh token expired");
    }
return createLoginTokens({user,refreshExpIn:JWT_REFRESH_EXPIRES_IN-consumedTime
})
}
export async function logout(payload,action) {
    const tokenExpireDate = payload.iat+JWT_REFRESH_EXPIRES_IN
    const currentDate = Math.floor(Date.now() / 1000);
    const consumedTime = currentDate - payload.iat;
switch (action) {
    case logoutAc.One:
        await setValue({
        key:`User::${payload.sub}::RevokeToken::${payload.jti}`,
        value:payload.jti,
        optains:{expiration:{value:tokenExpireDate- consumedTime}}
    })
        break;
    case logoutAc.All:
        user.changeTime=new Date()
        await user.save()
    break;
    default:
        break;
}
}