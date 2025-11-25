export const sendToken=(user,statusCode,res,req)=>{
    const token=user.getJWTToken();
    //options for cookie
    res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    const options={
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        secure:process.env.NODE_ENV==="production"?true:false,
        httpOnly:process.env.NODE_ENV==="production"?false:true,
    };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    })
}