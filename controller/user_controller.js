
const User = require('../models/userSchema');


module.exports.profile = function(req,res)
{
    return res.render('user_profile',{
        title:"User Profile"
    });
}

module.exports.signUp= function(req,res)
{
    if(req.isAuthenticated())
    {
         return res.redirect('/user/profile');
    }

    return res.render('user_singup',{
        title:"user | signUp"
    });
}

module.exports.signIn = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }

    return res.render('user_signin',{
        title:"user | signin"
    });
}

module.exports.create=function(req,res)
{
    if(req.body.password != req.body.confirm)
    {
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log(err);
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log(err);
                    return;
                }

                return res.redirect('/user/signin');


            });
        }
        else{
            return res.redirect('back');
        }

    });



}

module.exports.createSession =function(req,res)
{
    return res.redirect('/');
}

module.exports.destroySession = function(req,res)
{
    req.logout();
    return res.redirect('/');
}