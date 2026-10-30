export function successRes({res,status=200,message="done",data}){
res.status(status).json({message,data})
}    