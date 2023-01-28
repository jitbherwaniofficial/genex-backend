const express = require("express");
const router = express.Router();
const User = require("../model/user.model")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


router.get("/", (req, res) => {
    User.find()
        .then(result => {
            res.status(200).json({
                users: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                user: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err,
                message: "Error in Signing Up"
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                email: req.body.email,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                country: req.body.country,
                isAccepted: req.body.isAccepted,
                isNewsAccepted: req.body.isNewsAccepted
            })

            user.save()
                .then(result => {
                    console.log(result)
                    res.status(200).json({
                        success : true,
                        message: "Sign up Successfull !!",
                        user: result
                    })
                })
                .catch(err => {
                    if(err.code === 11000){
                    return res.json({success:false, message:"Email Already Exist!!"})
                    }
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: "Something Went Wrong !!"
                    })
                })
        }
    })

})

router.post("/login",(req,res)=>{
    User.find({
        email:req.body.email,
    })
    .exec()
    .then(result=>{
        if(result.length < 1){
            return res.json({
                success:false,
                message:"User Not Exist."
            })
        }
        const user = result[0];
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
           if(result){
            const payload = {
                userId:user._id,
            }
            const token = jwt.sign(payload,process.env.secret)
            return res.json({
                success:true,
                token:token,
                message:"Login Successfull."
            })
           }
           else{
            return res.json({
                success:false,
                message:"Password does not Match!!."
            })
           }
        })
    })
    .catch(err=>{
        res.status(500).json({
            success:false,
            message:"Authentication Failed!!",
            error:err
        })
    })
})



router.put("/:id", (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            country: req.body.country,
            isAccepted: req.body.isAccepted,
            isNewsAccepted: req.body.isNewsAccepted
        }
    }
    )
        .then(result => {
            res.status(200).json({
                updated_product: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.delete("/:id", (req, res) => {
    User.remove({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "User Deleted",
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router