const express = require("express")
const app = express();
const cors = require("cors")
// const {Server} = require("socket.io")
require("./db")
// require("./client")
const bp = require("body-parser")
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
// const http = require('http');
// const server = http.createServer(app);
// const io = new Server(server);

const port = process.env.PORT || 8000;

app.use(express.json());
const userroutes = require("./routes/theroroutes");
// const { emit } = require("./models/signupmodel");
app.use(cors())
// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,X-Requested-With, Content-Type,Accept,Authorization"

//     );
//     if(req.method==="   OPTIONS"){
//         res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE")
//     }
//     next()
// })

app.use(userroutes)
// io.on("connection",(socket)=>{
//     //join
//     console.log(socket.id);

// })




 const server = app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})


const io = require("socket.io")(server)
io.on("connection",(socket)=>{
    //join
    // console.log(socket.id);
    socket.on('join',(userId)=>{
        // console.log(userId);
        socket.join(userId)
    })
    socket.on("updated",(data)=>{
        // console.log(data);
        // socket.join(user)
        io.to(data).emit("updated",data)
    })
    socket.on("userget",(data)=>{
        // console.log(data);
        // socket.join(user)
        io.to(data).emit("user is geted",data)
    })
    socket.on("updatedstatus",(data)=>{
        // console.log(data);
        // socket.join(user)
        io.to(data).emit("status is updated",data)
    })
    socket.on("usergamestate",(data)=>{
        // console.log(data);
        // socket.join(user)
        io.to(data).emit("game status is getted",data)
    })
})
// io.on("connection",()=>{
//     io.to()
// })