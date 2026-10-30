import express, { Router } from"express"
import "dotenv/config";
import { DBconnection } from "./DB/connection.db.js"
import { userRouter } from "./module/auth/auth.controller.js";
import userrouter from "./module/user/user.controller.js";
import { client, connectRedis } from "./DB/redis/redis.js";
import { getValue, setValue } from "./common/cache.js";
const app=express()
app.use(express.json())
await connectRedis();
console.log(
    await setValue({
    key:"test",
    value:"this is for test",
    options:{expiration:{value:30}}
}));
console.log(
    await getValue("test"));

await DBconnection()
app.use("/assets",express.static("./assets"))
app.use("/user",userrouter)
app.use("/users",userRouter)
app.listen(process.env.PORT||3000)