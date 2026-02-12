import mongoose from "mongoose";


const connectedToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(err){
        console.log(err);
        
    }
}

export default connectedToDb;