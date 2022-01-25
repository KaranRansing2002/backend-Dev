const express=require('express');
const app=express();

app.listen(3000);

app.get('/', function (req, res) {
    res.send('<h1>Hello World</h1>')
})
app.get('/about', function (req, res) {
    res.sendFile('./aboutus.html',{root : __dirname})
})
app.get('/about-me',(req,res)=>{
    res.redirect('/about');
})

app.use((req,res)=>{
    res.status(404).sendFile('./errpage.html',{root : __dirname});
})