
module.exports.profile = function(req,res)
{
    return res.render('user_profile',{
        title:"User Profile"
    });
}

module.exports.create = function(req,res)
{

    return res.render('user_singup',{
        title:"user | signUp"
    });
}

module.exports.createSession = function(req,res)
{

    return res.render('user_signin',{
        title:"user | signin"
    });
}