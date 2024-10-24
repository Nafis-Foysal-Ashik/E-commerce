import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}

},{minimize:false})

/*here we use minimize=false because when we will create a user the default value of cartData is null and 
mongodb does not create any column with value init will null to support the vull default value we use 
minimize:false
*/

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;