const User = require("../models/signupmodel")
const jwt = require("jsonwebtoken");
const saveuser = require("../models/usermodel")
const game = require("../models/gamestatemodel")
const io = require("socket.io-client")
// let socket = io.connect("http://localhost:5000")


exports.signup=async (req,res)=>{
    try{
        const user = await User.findOne({metamaskaddress:req.body.metamaskaddress})

         if(user){
            // const token = jwt.sign({ _id: user._id }, "this is my");
            const token = await jwt.sign({ _id: user._id },"this is my");
            let socket = io.connect("http://localhost:5000")
            // let socket =io()
            socket.emit('join',`user_${user._id}`)
            // console.log((socket));
             res.status(200).json({user,token})
      
             

         }else{
        const user = await User({
         metamaskaddress:req.body.metamaskaddress
        })
        const result = await user.save()
        const token = await jwt.sign({ _id: user._id},"this is my" );
        // const token = jwt.sign({ _id: user._id }, "this is my");
        // let socket = io()
        let socket = io.connect("http://localhost:5000")
        socket.emit('join',`user_${user._id}`)
        // console.log(socket);
        res.status(200).json({result,token})

         }


    }catch(e){
        console.log(e);
        res.status(500).json(e)
    
}
},

exports.saveuser = async (req,res)=>{
    try{
        const user = req.user
        const { data } = req.body
        let temp = {  userId: user._id,data }
        const dat =await saveuser.findOne({userId:user._id})
        // console.log(data)
        if(dat) {
            const gamedata = await saveuser.findOneAndUpdate({userId:user._id},{$set:{data}},{new:true})
            let socket = io.connect("http://localhost:5000")
            socket.emit('updated',gamedata)
            res.status(200).json(gamedata)
        }else{
            const result = await saveuser.create(temp)
            let socket = io.connect("http://localhost:5000")
            socket.emit('updated',result)

            res.status(200).json(result)
            
        }



    }catch(e){
        console.log(e);
        res.send(e)
    }
},
exports.getuser= async(req,res)=>{
    try{
        const user = req.user
        // console.log("sdfsf",user);
        // const  data = await User.findOne({_id:req.body._id})
        console.log({_id:req.user._id});
        // res.send({_id:req.user._id})
        const  data = await saveuser.findOne({userId: user._id})
        if(data){
            let socket = io.connect("http://localhost:5000")
            socket.emit('userget',data)
            res.send(data)
        }else{
            res.send("invalid user")
        }

        // res.status(200).json(data)

    }catch(e){
        console.log(e);
        res.status(500).json(e)
    }
},
exports.addgamestate = async (req,res)=>{
       try{
        const user = req.user
        const { gamestate } = req.body
        let temp = {  userId: user._id,gamestate }
        const data =await game.findOne({userId:user._id})
        // console.log(data)
        if(data) {
            const gamedata = await game.findOneAndUpdate({userId:user._id},{$set:{gamestate}},{new:true})
            let socket = io.connect("http://localhost:5000")
            socket.emit('updatedstatus',gamedata)
            console.log(data);

            res.status(200).json(gamedata)
        }else{
            const result = await game.create(temp)
            let socket = io.connect("http://localhost:5000")
            socket.emit('updatedstatus',result)
            res.status(200).json(result)
            
        }
        
        // res.status(200).json(result)



        // const data = await game({
        //     gamestate:req.body.gamestate,
        //     userId:req.body.userId
        // })
        // const result =await data.save()
        // res.status(200).json(result)


       }catch(e){
           console.log(e);
           res.status(500).json(e)
       }
},
exports.getgamestate = async (req,res)=>{
    try{
        const user = req.user
        // const  data = await User.findOne({_id:user._id})
        // if(data){
          const data = await game.findOne({userId:user._id})
          if(data){
            let socket = io.connect("http://localhost:5000")
            socket.emit('usergamestate',data)
            res.send(data)
        }else{
            res.send("invalid user")
        }
        // }
        // res.status(200).json(data)

    }catch(e){
        console.log(e);
        res.status(500).json(e)
    }
}


