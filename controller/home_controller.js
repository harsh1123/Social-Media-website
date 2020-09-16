
const Post = require('../models/post');
const User = require('../models/userSchema');


module.exports.home = async function(req,res)
{

    try{

        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            },
            populate:{
                path:'likes'
            }
        }).populate('likes');
   
   
        let users = await  User.find({});
   
                
        return res.render('home',{
           title:"Codeial | Home",
           posts: posts,
           all_user:users
       });
        
 }
    catch(err)
    {
        console.log(err);
        return;

    }

  
}