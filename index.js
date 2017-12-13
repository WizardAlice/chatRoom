import './style.scss'
import $ from 'jquery'

var ws = new WebSocket('ws://localhost:8181/')

ws.onmessage = function(event) {
  let type = JSON.parse(event.data).type
  if(type == 'confirmList'){
    handleNameList(JSON.parse(event.data).list)
  }else if(type == 'public'){
    var mes = JSON.parse(event.data).mes
    var name = JSON.parse(event.data).name
    addContent(name+":")
    addContent(mes)
  }else if(type == 'secret'){
    var mes = JSON.parse(event.data).mes
    var name = JSON.parse(event.data).name
    addSecretContent(name+":")
    addSecretContent(mes)
  }
}

function handleNameList(names){
  $('#onlines').empty()
  names.map((name)=>{
    $('#onlines').append("<option value='"+name+"'>"+name+"</option>")
  })
}

function sendMess(type, mes, target=null){
  ws.send(JSON.stringify({
    mes: document.getElementById(mes).value,
    type: type,
    target: target
  }))
}

function addContent(content){
  $('#talk-content').append("<p>"+content+"</p>")
}
function addSecretContent(content){
  $('#secret-talk').append("<p>"+content+"</p>")
}

document.addEventListener('copy', (e) => {
  debugger
  e.clipboardData.setData('text/plain', 'Hello, world!');
  e.preventDefault()
})

document.getElementById('messageToAll').addEventListener('click', ()=> sendMess('messageToAll', 'counter'), false)
document.getElementById('changeName').addEventListener('click', ()=> sendMess('changeName', 'name'), false)
document.getElementById('messageToOne').addEventListener('click', ()=> sendMess('messageToOne', 'secret', $('#onlines').val()), false)

// $.post('http://localhost:8080/teststatus',{
//   name: "wangtong"
// },(res)=>{
//   debugger
//   return -1
// })

$.ajax({
  headers: {
    'Cache-Control': 'no-catch'
  },
  type: "POST",
  url: 'http://localhost:8080/teststatus',
  data: JSON.stringify({name: "wangtong"}),
  success: (res)=> alert(res)
})





















