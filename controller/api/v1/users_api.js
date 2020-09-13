const User = require('../../../models/userSchema');
const jwt = require('jsonwebtoken');



module.exports.createSession =async function(req,res)
{
 
  try {
    let user = await User.findOne({ email:req.body.email });
  
    if(!user || user.password != req.body.password)
    {
        return res.json(422,{
            message:"invalid username or password"
        });
    }
    return res.json(200,{
        message:"Sign In successful,here is token , please keep it safe!",
        data:{
            token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000'})
        }
    });


} catch (err) {
    console.log(err);
    return res.json(500,{

        message:"internal Error"

    });

      
  }
}


