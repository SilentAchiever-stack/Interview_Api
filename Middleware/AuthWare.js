const jsonwebtoken = require('jsonwebtoken');

const auth = async(req,res,next)=>{
    try{
        const token = req.cookies.access;
        if(!token || token === 'null'|| token === 'undefined'){
            return res.status(400).json({
                message:'invalid token'
            })
        }
        const verify = jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY);
        req.user = verify;
        next()
    }catch(error){
        return res.status(500).json({
            message:'something went wrong',
            data:error.message
        })
    }
}

module.exports = {auth};