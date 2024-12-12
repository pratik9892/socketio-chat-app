import express from "express"
import http from "http"
import path from "path"
import { Server } from "socket.io"

const port = 9000
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(path.resolve("./public")))
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', {
        message : msg,
        id : socket.id
      });
    });
  });



app.get("/" , (req,res) => {
    return res.sendFile("/public/index.html")
})

server.listen(port,()=>{
    console.log("server started at port " + port);
    
})
