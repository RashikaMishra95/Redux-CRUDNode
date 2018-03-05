var User=require("../models/user").User;
var Project=require("../models/project").Project;
var Lang=require("../models/project").Lang;
var Proj=require("../models/project").Proj;


exports.createUser=(req,res)=>{
    var user=new User({
        username:req.body.username,
        password:req.body.password
    });
    user.save().then(()=>{
        return user.generateAuthToken(user);
    }).then(()=>{
        res.header('x-auth',user.tokens[0].token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
};

exports.authenticate=(req,res,next)=>{

    var token=req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        req.user=user;
        req.token=token;
        next();
    }).catch((err)=>{
            res.status(400).send({"msg":"Please Login First"});
    })
};

exports.addlang=(req,res)=>{
    var newlang = new Lang({
        lname:req.body.lname
    });
    newlang.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
};

exports.addProj=(req,res)=>{
    var proj = new Proj({
        langid:req.body.langid,
        projname:req.body.projname
    });
    proj.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
};

exports.add=(req,res)=>{
    req.checkBody('ename','Enter a valid Emp name').isAlpha();
    var errors=req.validationErrors();
    if(errors){
        res.send({"message":'Errors','error':errors});
        return;
    }

    console.log("files : ",req.files);
    if(!req.files)
        return res.status(400).send('No files were uploaded.');

    let sample=req.files.img;

    sample.mv(__dirname + '/../uploads/' + sample.name,(err)=>{
        if(err)
            console.log(err);
    });

     var Proj=new Project({
         ename:req.body.ename,
         language:req.body.language,
         projname:req.body.projname,
         img:req.files.img.name
     });

    Proj.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
};

exports.list=(req,res)=>{
    console.log("in List");
    Project.find({isDel:true}).then((proj)=>{
      res.send(proj);
  }).catch((err)=>{
      console.log("ERROR :: ",err);
      res.send(err);
  })
};

exports.del=(req,res)=>{
    Project.findById(req.params.id).then((data) => {

        data.isDel=false;
        data.save().then((doc) => {
            console.log("document",doc);
            res.send(doc);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    }).catch((e) => {

    })};

exports.edit=(req,res)=>{
    console.log("inEdit : ", req.params.id);
    Project.findById(req.params.id).then((proj) => {

        proj.ename=req.body.ename;
        proj.language=req.body.language;
        proj.projname=req.body.projname;
        proj.img=req.files.img.name;

        proj.save().then((doc) => {
            console.log(doc);
            res.send(doc);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    }).catch((e) => {
    })
};
