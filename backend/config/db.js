const mongoose=require('mongoose')
const connectDB=async()=>{
    try {
        await mongoose.set("strictQuery", false);
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb Connected${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}
module.exports=connectDB