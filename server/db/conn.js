import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const con = await mongoose.connect("mongodb+srv://thedrivesales:thedrivesales@beta-version.iyu63.mongodb.net/betaversion?retryWrites=true&w=majority", {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log("mongodb connected :"+con.connection.host);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};
export { connectDB };
