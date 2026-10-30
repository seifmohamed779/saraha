import { GenderEnum } from "./enum/user.enum.js";
import * as z from "zod"
export const validFeilds={
    email:z.string().regex(/[a-z|A-Z0-9]{5,20}@(gmail|outlook|yahoo)(\.com|\.net){1,2}$/g),
    userName:z.string().regex(/^[A-Z]{1}[a-z]{1,15}\s[A-Z]{1}[a-z]{1,20}$/gm),
    password:z.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@$#&* ]).{8,16}/gm),
    phone:z.string().regex(/^(01|00201|\+201)(0|1|2|5){1}\d{8}$/gm),
    gender:z.literal(Object.values(GenderEnum)),
}
