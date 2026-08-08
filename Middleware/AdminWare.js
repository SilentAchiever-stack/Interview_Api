const isAdmin = async(req,res,next)=>{

   try{
   if(req.user.role !== 'admin'){
    return res.status(401).json({
        message:'Access denied'
    })
   }

   next()
   }catch(err){
    return res.json({
        message:'someting went wrong while trying to log in',
        data:err.message
    })
   }
}

module.exports = {isAdmin}