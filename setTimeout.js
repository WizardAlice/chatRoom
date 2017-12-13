var t = true;

setTimeout(function (){
    t = false;
    console.log(1)
},1000);

while (t){}

console.log('end');