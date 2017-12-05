var express = require('express'), //引入express模块
    app = express(),
    server = require('http').createServer(app);
//     io = require('socket.io')(require('http'));

app.use('/index', (req, res) => res.sendFile(__dirname + '/WebSocket.html')); //指定静态HTML文件的位置
server.listen(8080);

app.use(express.static('dist'));
// io.on('connection', (socket) => {
//  console.log(socket)
// })

const WebSocketServer = require('ws').Server
const uuid = require('node-uuid')

wss = new WebSocketServer({port: 8181})

var clients = []

wss.on('connection',(ws)=>{
  let client = {
    name: "未知",
    id: uuid.v4(),
    socket: ws
  }
  clients.push(client)
  console.log("connection")
  ws.on('message', (message)=>{
    let data = JSON.parse(message)
    switch(data.type){
      case 'messageToAll' : 
        sendMessage(client, data.mes)
        break;
      case 'changeName' :
        client.name = data.mes
        changeName(client.id, data.mes)
        break;
      case 'messageToOne': 
        sendMessageOne(data.target, data.mes)
        break;
    }
  })
})

sendMessageOne = (targetName, mes) =>{
  clients.map((client)=>{
    if(client.name == targetName && client.socket.readyState == 1){
      client.socket.send(JSON.stringify({
        mes: mes,
        name: targetName,
        type: 'secret'
      }))
    }
  })
}

sendMessage = (c, mes) => {
  clients.map((client, index) => {
    if(client.socket.readyState == 1){
      client.socket.send(JSON.stringify({
        mes: mes,
        name: c.name,
        type: 'public'
      }))
    }
    else{
      clients.splice(index,1)
    }
  })
}

alertAll = (id) => {
  let list = clients.map( i => i.name )
  console.log(list)
  clients.map((client)=>{
    if(client.socket.readyState == 1){
      client.socket.send(JSON.stringify({
        list: list,
        type: "confirmList"
      }))
    }
    else{
      clients.splice(index,1)
    }
  })
}

changeName = (id, name) => {
  clients.map((client,index)=>{
    if(client.socket.readyState == 1){
      if(client.id == id){
        client.name = name
      }
    }
    else{
      clients.splice(index,1)
    }
  })
  alertAll(id)
}

// include_attr = (x, y, key) => {
//   let flag = false
//   x.map((v) => {
//     v[key]
//   })
// }


