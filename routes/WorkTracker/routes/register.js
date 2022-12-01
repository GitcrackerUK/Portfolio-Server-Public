const TESCO_USERS_URI = process.env.TESCO_USERS_URI;
const User = require('../models/user.model.js')
const router = require('express').Router()
const DB = require('../../../DB')
require('dotenv').config();


DB(TESCO_USERS_URI)

router.route('/').post((req,res)=>{
    const {user, password, email} = req.body;

    User.find({user:user}, (err, name)=>{
        if(name[0]){
            res.send({message:'user already registered', user:name[0].user, calendar:name[0].calendar.length});
        }else{
            let newUser = new User({
                user,
                password,
                email,
                calendar:[]
                })
            newUser.save((err)=>{
                if(err){
                    res.send({error:err.name,message:err.message})
                }else{
                        res.send({message:'User Registered'})
                }
            })
            
            
            
        }
    });
})

module.exports = router