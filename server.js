const express =require('express');
const bodyparser=require('body-parser');

const server=express();
server.use(bodyparser.json());
const users=[
    {
        id:"ehgus",
        name:"abs"
    },
    {
        id:"ehgus2",
        name:"abs2"
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

server.post("/register",(request,resond)=>{
    users.push(request.body);
    console.log(request.body);
    resond.json(users);
});

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