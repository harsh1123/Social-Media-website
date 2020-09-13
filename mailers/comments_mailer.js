const nodeMailer = require('../config/nodemailer');



exports.newComment =(comment) => {

    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comment/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'harshshrivastava481@gmail.com',
        to:comment.user.email,
        subject:"New Comment published",
        html:htmlString

    },(err,info) => {

    if(err)
    {
        console.log(err);
        return;
    }

    console.log('Message sent',info);
    return;

    });
}