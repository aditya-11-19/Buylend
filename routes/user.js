import express from 'express';
const router=express.Router()
const bcrypt=require('express')
const jwt=require('jwt')
const keys=require('../config/keys')
const passport=require('passport')

// Load User model
const User = require('../../models/User');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');


// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register',()=>{

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

    User.findOne({email:requestAnimationFrame.body.email}).then((user)=>{
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
          } 
    else{

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            institute: req.body.institute,
            phone_no: req.body.phone_no
          });
     
          bcrypt.gensalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err)  throw err
                newUser.password=hash
                newUser
                .save()
                .then(user=> res.json(user))
                .catch(err => console.log(err))
            })
          })
    }
    })
})

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
  
      // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
  
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
  });
  