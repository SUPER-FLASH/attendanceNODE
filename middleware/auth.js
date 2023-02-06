const jwt = require("jsonwebtoken");
const Admin = require("../Schema/adminSchema");


const getAppCookies = (req) => {
    // We extract the raw cookies from the request headers
    //console.log(req.headers.cookie);
    const rawCookies = req.headers.cookie.split('; ');
    // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']
   
    const parsedCookies = {};
    rawCookies.forEach(rawCookie=>{
    const parsedCookie = rawCookie.split('=');
    // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
     parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
   };

const auth = async (req, res,next) =>{
    try{
        const token = req.cookies._securepurge;
        if(token){
            console.log(token,"auth------------------------------------");
            const verify = jwt.verify(token,process.env.JWT_KEY);
            req.userId = verify._id;
            console.log(verify);
            next();
        }else{
            next();
        }
       
    }catch(err){
        console.log(err);
        
    }

}

module.exports = auth;