import { createClient } from "redis"
import { REDIS_URL } from "../../config/config.js";
export const client = createClient({
url: REDIS_URL
});
export async function connectRedis() {
    try {
        await client.connect()
        console.log( "Redis Connected");
        
    } catch (error) {
        console.log( "Redis Failes");
        console.log({error});
        
    }
}
