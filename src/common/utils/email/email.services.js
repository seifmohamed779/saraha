import { transporter } from "./email.config.js";

export async function sendEmail({to,subject,html,attachments,cc,bcc}){ 

try {
    const info = await transporter.sendMail({
from:"mohamedsef91@gmail.com",
to,
subject,
html, 
attachments,
cc,
bcc,
    })
    console.log("sent",info.messageId)
} catch (err) {
    console.log("err in sending",err);
    
}
}