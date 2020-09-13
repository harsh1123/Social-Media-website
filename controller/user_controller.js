
const User = require('../models/userSchema');
const fs= require('fs');
const path = require('path');
const e = require('express');


module.exports.profile = function(req,res)
{
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"User Profile",
            profile_user:user
        });

    });
   
}

module.exports.update =async function(req,res){
  
    if(req.user.id == req.params.id){
        try {

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err)
                {console.log('******MulterError',err);}

                user.name = req.body.name;
                user.email = req.body.email;
               
                if(req.file)
                {
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');

            });
            
        } catch (err) {

            
            return res.redirect('back');
            
        }

    }
    else
    {
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
    req.flash('success','logged in Successfully');

    return res.redirect('/');
}

module.exports.destroySession = function(req,res)
{
    req.logout();
    
    req.flash('success','logged out Successfully');

    return res.redirect('/');
}