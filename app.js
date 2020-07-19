const express=require('express');
const jsonwebtoken=require('jsonwebtoken');

const app=express();



//generate a token
app.post('/api/login',(request,response)=>{
    const mockUser={
        id:1,
        userName:"vignesh",
        email:"vignesh@gmail.com"
    }
    jsonwebtoken.sign({user:mockUser},'kTyuI56d3e4F',(err,token)=>{
        response.json({token});        
    })
});

const verifyToken=(request,response,next)=>{
    const currentUserToken=request.headers["authorization"];
    if(currentUserToken!=undefined){
        request.token=currentUserToken;
        next();
    }else{
        response.sendStatus(403);
    }
}

//routes
app.get('/api',(request,response)=>{
    response.status(200).json({message:"welcome"});
});


//protected route
app.post('/api/posts',verifyToken,(request,response)=>{
    console.log('requested');
    jsonwebtoken.verify(request.token,'kTyuI56d3e4F',(err,authData)=>{
        if(err){
            response.sendStatus(403);
        }else{
            response.status(200).json({message:"posts api",authData});
        }
    })
});




app.listen(3000,()=>console.log('running on port 3000'));
