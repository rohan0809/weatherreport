const express=require('express')
const app=express();
const PORT=3001;
const bodyPraser =require('body-parser')
const http=require('https');
const path=require('path')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyPraser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.render('index.ejs')
})


app.post("/",(req,res)=>{
    const apikey='06fcb168f461b6b76667eb983209ca73';
    const city=req.body.cityname;
    const url ='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apikey+'&units=metric';
    http.get(url,(response)=>{
        response.on('data',(data)=>{
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const descrip=weatherdata.weather[0].main;
           res.render('index.ejs',{temparature:{temp},deep:{descrip}});
        })
    })
})

app.listen(PORT,()=>{
    console.log(`ur server is runng at port : ${PORT}`)
})


