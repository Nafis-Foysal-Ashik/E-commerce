import { v2 as cloudinary } from "cloudinary" 
import productModel from "../models/productModel.js"

//function for add product
const addProduct = async(req,res)=>{

    try {

        const {name,description,price,category,subCategory,sizes,bestseller}=req.body

        // const image1 =/*req.files.image1 && */ req.files.image1[0]
        // const image2 =/*req.files.image2 && */ req.files.image2[0]
        // const image3 =/*req.files.image3 && */ req.files.image3[0]
        // const image4 =/*req.files.image4 && */ req.files.image4[0]

        const image1 = req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files.image4 ? req.files.image4[0] : null;

        //check if any image file box is empty or not 
        //we can upload max 4 image as defined in the programme if any of the image 
        //input field is empty it will be undefined
        const images = [image1,image2,image3,image4].filter((item)=>item != undefined)

        let imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            //true will be a string so we have to compare it
            bestseller: bestseller==="true" ? true : false,
            //convert the json array into string and then again convert it into array
            image:imageUrl,
            date:Date.now()
        }

        console.log(productData)

        const product = new productModel(productData);
        await product.save()
        res.json({success:true , message:"Product added"})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//function for list product
const listProducts=async(req,res)=>{

}

//function for removing product
const removeProduct=async(req,res)=>{

}

const singleProduct=async(req,res)=>{

}

export {addProduct,listProducts,removeProduct,singleProduct}