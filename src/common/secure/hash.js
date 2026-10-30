


import * as argon from "argon2"
import * as bcrypt from "bcrypt"
import { HashTollEnum } from "../enum/hash.enum.js"
export async function hashValue({ //type
    value,
    rounds=12,
    tool=HashTollEnum.bcrypt   //default
}) {
    let hashedValue
    switch (tool) {
        case HashTollEnum.bcrypt:
            hashedValue=await bcrypt.hash(value,rounds)
            break;
        case HashTollEnum.argon:
            hashedValue=await argon.hash(value)
            break;
    
        default:
            break;
    }
    return hashedValue
}

export async function compareHash({value,hash,tool=HashTollEnum.bcrypt}) {
    let compareResult
    switch (tool) {
        case HashTollEnum.bcrypt:
        compareResult=await bcrypt.compare(value,hash)
            break;
        case HashTollEnum.argon:
            compareResult=await argon.verify(hash,value)
            break;
        default:
            break;
    }
    return compareResult
    
}
