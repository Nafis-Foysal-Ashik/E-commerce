import mongoose from "mongoose";

const connectDB = async () => {

    //if the database is connected then this fucntion will be executed
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected");
    })

    //create databse e-commerce
    await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`)

}

export default connectDB;