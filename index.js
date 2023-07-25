const express = require("express")
const app = express();
const mongoose = require("mongoose");

const cors = require("cors")
require('dotenv').config()
// const dotenv = require("dotenv")
const connectDB = require("./config/db")
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json())

//config dotenv
// dotenv.config()

//rest object

//middlewires

// app.use(bodyParser.urlencoded({extended: false}));

const apiData = require("./data.json")

connectDB();
app.get(`/`, async (req, res) => {
    console.log("Server is running... ");
    res.status(200).json({ success: true })
})

const sch = new mongoose.Schema({
    // id: Number,
    name: String,
    username: String,
    email: String,
    phone: String,
    address: [{
        street: String,
        city: String,
        zipcode: String,
        geo: [{
            lat: String,
            lng: String
        }],
    }]
})

const mongomodel = mongoose.model("users", sch)

//Get data from db
app.get("/users", (req, res) => {
    res.send(apiData);
})

// Add data to DB
app.post("/post", async(req, res) =>{
    console.log("Inside post");

    const data = new mongomodel({
        // id:req.body.id,
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        // address: [{
        //     street: req.body.street,
        //     city: req.body.city,
        //     zipcode: req.body.zipcode,
        //     geo: [{
        //         lat: req.body.lat,
        //         lng: req.body.lng
        //     }]
        
        // }]
        address:req.body.address,
        geo:req.body.geo
    })   

    const val=await data.save()
    res.json(val)
})

// update data to DB
app.put("/update/:id", async(req, res) =>{
    console.log("Inside Put");
    console.log(req.params.id);

    mongomodel.findOneAndUpdate({_id:req.params.id}, {
        $set:{
            // id:req.body.id,
            name:req.body.name,
            username:req.body.username,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            geo:req.body.geo
        }
    })
    .then(result=>{
        res.status(200).json({
            Updated:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

// Delete data from DB
app.delete("/delete/:id", async(req, res) =>{
    console.log("Inside delete");
    mongomodel.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:"Data deleted",
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
app.listen(2000, () => {
    console.log("Server is running... ");
});