const  moment = require('moment')
const jwt = require('jwt-simple')


const jwtTokenSecret = 'MY_SECRET_STRING'

function getToken(username, res){ //返回token
  let expires = moment().add('days', 7).valueOf()
  var token = jwt.encode({
    username: username,
    exp: expires
  }, jwtTokenSecret)
  res.json({
    token: token,
    expires: expires,
    username: username
  })
}

function getIndex(req,res,next){  //得到token之后进行解码验证
  let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
  if(token){
    try{
      let decoded = jwt.decode(token, jwtTokenSecret)
      res.sendFile(__dirname + '/WebSocket.html')
    }catch(err){
      return next()
    }
  }else{
    next()
  }
}

module.exports = {
  getToken: getToken,
  getIndex: getIndex
}