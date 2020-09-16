 
 const Post = require('../models/post');
 const Comment = require('../models/comment');
 const Like = require('../models/like');

module.exports.create = async function(req,res)
{

    try {

        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
                 });
       if(req.xhr)
       {
           return res.status(200).json({
               data:{
                   post:post
               },
               message:'post Created'
           });
       }

        req.flash('success','Post Created ');
    
        return res.redirect('back');
        
    } catch (error) {

        req.flash('error','Error In Creating The Post ');
        return res.redirect('back');
        
    }
  

}

module.exports.destroy = async  function(req,res)
{
    try {

        let post = await   Post.findById(req.params.id);
   
    if(post.user == req.user.id)
     {

     await Like.deleteMany({likeable:post,onModel:'Post'});
     await Like.deleteMany({_id:{$in:post.comments}});

     post.remove();
      await Comment.deleteMany({post:req.params.id});

      if(req.xhr)
      {
          res.status(200).json({
              data:{
                  post_id:req.params.id
              },
              message:"post deleted Successfully"

          });
      }
      
      req.flash('success','Post Deleted  ');
      return res.redirect('back');
     }
    else{
      
        
       return res.redirect('back');
      }


        
    } catch (error) {

        
       
        req.flash('error','error in deleting the post ');
        return;
        
        
    }

 
}

