import jwt from 'jsonwebtoken'

const adminAuth = async(req,res,next)=>{
    try{
        const {token} = req.headers
        if(!token)
        {
            return res.json({success:false,message:"Not Authorized"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        /*process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD 
        here we concatinate these two because we have created the token of email+password
        so while decode it we will do the reverse thing
        */
        if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized"})
        }
        next()
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default adminAuth