const { toggleLike } = require("../../controller/like_controller");

{
   

let createPost = function(){
     
    let newPostForm  = $('#new-post-form');

   newPostForm.submit(function(e){
       e.preventDefault();

       $.ajax({
           type:'post',
           url:'/posts/create',
           data: newPostForm.serialize(),
           success:function(data){
             
           let newPost = newPostDom(data.data.post);
           $('#posts-list-container>ul').prepend(newPost);
           deletePost($(' .delete-post-button',newPost));


           new PostComments(data.data.post._id);
           new toggleLike($('.toggle-like-button',newPost));





            new Noty({
               theme:'relaxed',
               text:'Post Published',
               type:'success',
               layout:'topRight',
               timeout:1500

            }).show();



            
           },
           error: function(error)
           {
               console.log(error.responseText);

           }
       });

   });
}

let newPostDom = function(post)
{
    return $(`
    <li id="post-${post._id}">
        <p>
           
                <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
    
             
    
    
                ${post.content}
        <br>
        <small>

    
        ${post.user.name}
        
        </small>
        <br>
        <small>
         
        <a  class="toggle-like-button" data-likes="0" href=" /likes/toggle/?id=$(post._id)&type=Post">
        0 Likes
        </a>

        </small>
        <br>
    
        </p>
       <div class="post-comments">
              
    
                <form action="/comments/create" method="POST">
    
                        <input type="text" name="content" placeholder="add comment" required>
                        <input type="hidden" name="post" value="${ post._id }">
                        <input type="submit" value="Post comment">
    
                </form>
                
                
                
               
    
        <div class="post-comments-list">
                <ul id="post-comment-${ post._id }">
                      
                </ul>
        </div>
    
            
    
        </div>
    
    </li>
    `);
}


let deletePost = function(deleteLink)
{
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
           type:'get',
           url:$(deleteLink).prop('href'),
           success:function(data){
             $(`#post-${data.post_id}`).remove();
           },
           error:function(error)
           {
               console.log(error.responseText);
           }

        });

    });
}

createPost();

}