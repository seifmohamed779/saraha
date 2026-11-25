//cypto ,randomint(1000000,9999999)
import {randomInt} from "node:crypto"
export function GenOTP(){
    return randomInt(1000000,9999999)
}