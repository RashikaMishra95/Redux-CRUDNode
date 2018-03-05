const mongoose=require("mongoose");
const jwt=require('jsonwebtoken');
var userSchema=mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    tokens:[{
      access:String, token:String
    }]
});

userSchema.methods.generateAuthToken=(user)=>{
    var access="auth";
    var token=jwt.sign({_id:user._id.toHexString(),access},'mytoken').toString();
    user.tokens.push({access,token});
     user.save().then(()=>{
        return token;
    });
};
userSchema.statics.findByToken=(token)=>{
    var User=this;
    console.log("In FindByTOKEN : ",token);
    var decoded;

    try{
        decoded=jwt.verify(token,'mytoken');
    }catch(err){
        return Promise.reject(err);
    }

    return User.findOne({
        _id:decoded._id
    });
};

var User=mongoose.model("ColUser",userSchema);
module.exports={User};