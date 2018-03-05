var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/ProjectDB").then(()=> console.log("Connected to Database")).catch((err)=> console.log("Error In Connection"));
module.exports={mongoose};
