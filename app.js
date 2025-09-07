const express = require('express');
const app = express();
const path = require('path');
const usermodel = require('./usermodule');
const { name } = require('ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/user', async (req, res) => {
     let data = await usermodel.find();
    res.render('user',{data});
});
app.post('/insert',async (req,res)=>{
    const {name,email,image}=req.body;
    let ans=await usermodel.create({
        name,
        email,
        image
    });
    let data = await usermodel.find();
    res.render('user',{data});
});

app.post('/find',async (req,res)=>{
    if (req.body.name!="") {
        let data = await usermodel.find({name:req.body.name});
        res.render('user',{data});
    }
    else{
        let data = await usermodel.find();
        res.render('user',{data});    
    }
});

app.get('/update/:anyname', async (req,res)=>{
    let x=await usermodel.findOne({name:req.params.anyname});
    res.render('update',{name:x.name,email:x.email,img:x.image});
});

app.post('/update/:anyname',async (req,res)=>{
    let x=await usermodel.findOneAndUpdate({name:req.params.anyname},{email:req.body.email,image:req.body.image},{new:true});
    let data = await usermodel.find();
    res.render('user',{data}); 
});
app.get('/delete/:anyname', async (req,res)=>{
    await usermodel.findOneAndDelete({name:req.params.anyname});
    let data = await usermodel.find();
    res.render('user',{data});
});
app.listen(3000,(err)=>{
});

