const mongoose=require("mongoose");

var ProjectSchema=new mongoose.Schema({
    ename:{
        type:String
    },
    language:{
        type:String
    },
    projname:{
        type:String
    },
    img:{
        type:String
    },
    isDel:{
        type:Boolean,
        default:true
    }
});
var LanguageSchema=new mongoose.Schema({
    lname:{
        type:String
    }
});
var ProjNameSchema=new mongoose.Schema({
    langid:{
      type:String
    },
    projname:{
        type:String
    }
});

var Proj=mongoose.model("ColProjname",ProjNameSchema);
var Lang=mongoose.model("ColLanguage",LanguageSchema);
var Project=mongoose.model("ColProject",ProjectSchema);
module.exports={Project,Lang,Proj};