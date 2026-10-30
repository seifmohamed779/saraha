
export function authorization(role) {
    return async function (req,res,next) {

//         if(req.user.role<role){
//             throw new Error("Can't Access in this page");
//         }
        next()
    }
}