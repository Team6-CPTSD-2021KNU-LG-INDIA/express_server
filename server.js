const express =require('express');
const bodyparser=require('body-parser');
const request_ip=require('request-ip');

const server=express();
server.use(bodyparser.json());

const users=[
    {
        id:"dummy",
        device_name: 'audio',
        api: 'http://192.168.56.1:4000/music_on'
    }
];
server.get("/list",(resquest,respond)=>{
    respond.json(users);
});

server.get("/list/:id",(request,respond)=>{
    const user=users.find((u)=>{
        return u.id === request.params.id;
    });
    if(user){
        respond.json(user);
    }else{
        respond.status(404).json({errorMessage:"User was not found"});
    }
});

server.post("/register",(request,respond)=>{
    const device_ip=request_ip.getClientIp(request);
    const ip=device_ip.split(':');
    console.log
    console.log(request.body);
    
    const device_info=request.body.api='http://'+ip[3]+':'+request.body.port+'/'+request.body.function;

    delete request.body.port;
    delete request.body.function;
    request.body.api=device_info;
    var found=users.find((item,idx)=>{
        return item.api==device_info;
    });
    if(!found){
        users.push(request.body);
    }
    console.log(request.body);
    
    respond.json(users);
});

server.get("/device/:id/:device_name",(req,res)=>{
    console.log(req.params.id,req.params.device_name);
    let foundIndex=users.findIndex(u=>(u.id===req.params.id && u.device_name===req.params.device_name));
    if(!foundIndex){
        res.respond(404).json({errorMessage:"User was not found"});
    }else{
        res.redirect(users[foundIndex].api);
    }
});

server.get("/testIp",(req,res)=>{
    cli_Ip=request_ip.getClientIp(req);
})

// server.put("/update/:id",(req,res)=>{
//     let foundItem=users.findIndex(u=>u.id===req.params.id);
//     if(!foundItem){
//         res.respond(404).json({errorMessage:"User was not found"});
//     }else{
//         users[foundItem]={...users[foundItem],...req.body};
//         res.json(users[foundItem]);
//     }
// });

// server.delete("/delete/id",(req,res)=>{
//     let foundItem=users.findIndex(u=>u.id===req.params.id);
//     if(!foundItem){
//         res.status.json({errorMessage:"user was not found"});
//     }else{
//         let foundUser=users.splice(foundItem,1);
//         res.json(foundUser[0]);
//     }
// });

server.listen(3000,()=>{
    console.log('server is running');
});