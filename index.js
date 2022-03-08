if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('./models/article')
const methodOverride = require('method-override')


mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('DB Connected!!');
    })
    .catch((err)=>{
        console.log('Some Error');
        console.log(err);
    })


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'))
app.use('/articles', articleRouter);


app.get('/',async(req,res)=>{
    const articles = await Article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles : articles});
})


app.listen(process.env.PORT || 2023,()=>{
    console.log(`Server Started`);
})