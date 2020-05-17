function crosPermission(){
    this.permission=function(req,res,next){
      res.header('Access-Control-Allow-Origin','*');
      res.header('Access-Control-Allow-Headers',"Authorization,Access-Control-Allow-Headers,Access-Control-Allow-Methods, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      res.header('Authorization','*')
      res.header('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','OPTIONS');
      next();
    }
    
  }
  
  module.exports= new crosPermission();