var express=require('express');
var bodyParser=require('body-parser');
var {mongoose}=require('./config/conn');
var cors=require('cors');
var passport=require('passport');
var fileUpload=require('express-fileupload');
var validator=require('express-validator');
var app=express();

global.token='';
require('./config/passport')(passport);
app.use(validator());
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static(__dirname+'/'));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:3003');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true);
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Allow-Methods`, `DELETE`);
    res.header(`Access-Control-Allow-Methods`, `PATCH`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
});
require("./routes/projectRoute")(app,passport);

app.get('/',(res,resp)=>{
    resp.sendFile(__dirname + '/');
});
app.listen(3004,()=>{
    console.log('server is started');
});