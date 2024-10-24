import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{type: String, required: true},
    description:{type: String, required: true},
    price:{type: Number, required: true},
    image:{type: Array, required: true},
    category:{type:String, required: true},
    subCategory:{type:String, required: true},
    sizes:{type:Array, required: true},
    bestseller:{type:Boolean},
    date:{type:Number, required: true}
})

//mongoose.model("product",productSchema) -> create a model name product
//when we run this the productModel can be built multiple . To avoid this we will use 'mongoose.models.product'
//the OR will check if the productModel is previouly created or not.If created then it will execute only 'mongoose.models.product' without creating extra model
const productModel = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel;