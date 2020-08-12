
const User = require('../models/userSchema');


module.exports.profile = function(req,res)
{
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"User Profile",
            profile_user:user
        });

    });
   
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){

            return res.redirect('back');

        });

        
    }
    else{

        return res.status(401).send('Unauthorized');
    }      

}

module.exports.signUp= function(req,res)
{
    if(req.isAuthenticated())
    {
         return res.redirect('/users/profile');
    }

    return res.render('user_singup',{
        title:"user | signUp"
    });
}

module.exports.signIn = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
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

                return res.redirect('/users/signin');


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