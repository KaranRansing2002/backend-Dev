const fs=require('fs');
const http=require('http');

const server=http.createServer((req,res)=>{
    console.log('request has been processed');
    res.setHeader('content-type','text/html');
    
    let path='./';
    switch(req.url){ 
        case '/':
            path+='/index.html';
            break;
        case '/aboutus':
            path+='/aboutus.html';
            break;
        default:
            path+='/errpage.html';
            break;
    }
    fs.readFile(path,(err,filedata)=>{
        if(err){
            console.log(err);
        }
        else{
            res.write(filedata);
            res.end();
        }
    })
})

server.listen(3000,'localhost',()=>{
    console.log('server is listning');
})