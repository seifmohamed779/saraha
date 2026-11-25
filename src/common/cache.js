import { client } from "../DB/redis/redis.js"

export async function setValue({
    key,
    value,
    options={expiration:{type:"EX",value:100}}
}) {
    if(typeof value==="object"){
        value=JSON.stringify(value)
    }
    if(!options.expiration.type){
        options.expiration.type="EX"
    }
    return await client.set(key,value,options)
}
export async function getValue(key) {
    let result;
    try {
        result=await client.get(key)
        return JSON.parse(result)
    } catch (error) {
        return result
    }
}
export async function ttlValue(key) {
    return await client.ttl(key)
}
export async function isExist(keys) {
    return await client.exists(keys)
}