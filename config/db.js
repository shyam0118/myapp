const mongoose = require("mongoose");

console.log("hello", process.env.MONGO_URI);
const connectDB = async () => {
    try {
        console.log("hello", process.env.MONGO_URI);
        mongoose.connect("mongodb://localhost:27017/myapp").then(() =>{
            console.log('connection successfull');
            }).catch((err)=> console.log('no connection'));
    } catch (error) {
        console.log(`Mongodb database error ${error}`);
    }
}

module.exports = connectDB;