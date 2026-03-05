import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionData = await mongoose.connect(process.env.MONGO_URI)
        console.log("connection host : ", connectionData.connection.host)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default connectDb