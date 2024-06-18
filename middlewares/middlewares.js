
export const logger =(req,res,next)=>{
    console.log("Todo perfecto desde el middleware");
    next()
  }