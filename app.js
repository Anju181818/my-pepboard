const express = require("express"); //Access
const socket = require("socket.io");
const app=express();//Initialized and server ready

app.use(express.static("public"));

let port=5000;
let server=app.listen(port,()=>{
    console.log("listening to the port"+port)
})




let io=socket(server);
//console.log(io)
io.on("connection",(socket)=>{
    console.log("made socket connection",socket);

    //Received Data
socket.on("beginPath",(data)=>{
    //data->data from frontend
    //Now transfer data to all connected computers
    io.socket.emit("beginPath",data)
    })

    socket.on("drawStroke",(data)=>{
        io.sockets.emit("drawStroke",data)
    })
    socket.on("redoUndo",(data)=>{
        io.sockets.emit("redoUndo",dat)
    })
})


