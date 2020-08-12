
const Post = require('../models/post');
const User = require('../models/userSchema');
module.exports.home = function(req,res)
{

    
     Post.find({})
     .populate('user')
     .populate({
         path:'comments',
         populate:{
             path:'user'
         }
     })
     .exec(function(err,posts){

        User.find({},function(err,users){
              
            return res.render('home',{
                title:"Codeial | Home",
                posts: posts,
                all_user:users
            });

        });
         
        

     });
     
 
}