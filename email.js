var nodemailer = require('nodemailer');  
var transporter = nodemailer.createTransport({  
  service: 'qq',  
  auth: {  
    user: '1312229175@qq.com',  
    pass: 'xakhadbprzrhbaef' //授权码,通过QQ获取 
  }  
  });  
  var mailOptions = {  
    from: '1312229175@qq.com', // 发送者  
    to: '2221350282@qq.com', // 接受者,可以同时发送多个,以逗号隔开  
    subject: 'node', // 标题  
    //text: 'Hello world', // 文本  
    html: `<h2>测试</h2><h3>`   
  };  
  
  transporter.sendMail(mailOptions, function (err, info) {  
    if (err) {  
      console.log(err);  
      return;  
    }  
  
    console.log('发送成功');  
  }); 