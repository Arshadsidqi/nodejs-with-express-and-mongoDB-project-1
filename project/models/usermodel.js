const {Schema , model}=require("mongoose")
const UserSchema=new Schema({
    email: {
        type: String,
        required: true,
         unique:true,
         trim:true,
      },
    
    username: {
        type: String,
        required: true,
         unique:true,
         trim:true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
})
module.exports=model("user",UserSchema);//in database users collection will be created