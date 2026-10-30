export function validi(schema) {
    return(req,res,next)=>{
        //const language=req.headers["accept-language"]
        const validDate=schema.safeParse({body:req.body,params:req.params,query:req.query
        })

    if(!validDate.success){
        console.log(validDate.error.issues);

            return res.status(400).json({
                message: "Validation failed",
                errors: validDate.error.issues
            })
    }   
    console.log({validDate:validDate.data});
    
    req.validDate=validDate.data
    next()
}
}