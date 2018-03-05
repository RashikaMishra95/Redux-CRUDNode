
var User=require("../models/user");
var LocalStrategy=require("passport-local").Strategy;

module.exports=(passport)=>{

  passport.serializeUser((user,done)=>{
      token=user.tokens[0].token;
      return done(null,true);
  });
  passport.deserializeUser((user,done)=>{

  });

  passport.use('local',new LocalStrategy({
    usernameField:'username',
    passwordField:'password'
  },(username,password,done)=>{
        User.findOne({username}).then((user)=>{
            if(!user){
                console.log("Invalid User");
                return done(null,false);
            }
            if(user.password!==password){
                return done(null,false);
            }
            console.log("Logged In : ",User);
            return done(null,user);
        }).catch((err)=>{

        })
  }))
};