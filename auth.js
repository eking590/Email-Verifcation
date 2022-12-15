const User = require('../models/user'); 
const jwt = require('jsonwebtoken'); 
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox331d96731f1c46e280acb67387298536.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

//create use without emaii account activation 
// exports.signup = (req, res) => {
//     console.log(req.body); 
//     const {name, email, password} = req.body; 
//     User.findOne({email}).exec((err, user) => {
//         if (user) {
//             return res.status(400).json({error: "user with this email already exists."})
//         } 
//         let newUser = new User({name, email, password}) 
//         newUser.save((err, success) => {
//             if (err) {
//                 console.log('error in signing up', err); 
//                 return res.status(400), json({error:err}) 
//             } res.json({
//                 message: "signup successful!"
//             })
//         })
//     })
// }





//create use without emaii account activation 
exports.signup = (req, res) => {
    console.log(req.body); 
    const {name, email, password} = req.body; 
    User.findOne({email}).exec((err, user) => {
        if (user) {
            return res.status(400).json({error: "user with this email already exists."})
        }
        
        const token = jwt.sign({name, email, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn:'20m'}) 


 

        const data = {
            from: 'eking@gmail.com',
            to: email,
            subject: 'Account Activation Link',
            html:`
                <h2> Please click on the given link to activate your account </h2> 
                <p> ${process.env.CLIENT_URL}/authentication/activate/${token}</p> 
            
            
            `
        };
        mg.messages().send(data, function (error, body) {
            if(error){
                return res.json({
                    error: " Email cannot be sent!!!!"
                })
            }
            return res.json({message: "Email has been sent, kindly activate your account"})
           
        });
    }) 
}
        
exports.activateAccount = (req, res) => {
    const {token} = req.body; 
        if(token){
            jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function(err, decodedToken){
                if (err){
                    return res.status(400).json({error: 'Incorrect or Expired link...'})
                }
                const {name, email, password} = decodedToken; 
                User.findOne({email}).exec((err, user) => {
                    if (user) {
                        return res.status(400).json({error: "user with this email already exists."})
                        } 
                        let newUser = new User({name, email, password}) 
                        newUser.save((err, success) => {
                            if (err) {
                                console.log("error in signing up while account activation", err); 
                                return res.status(400), json({error:"Error activating account!!"}) 
                                } res.json({
                                    message: "signup successful!"
                                })
                            })
                        })
                })

            }else{
                return res.json({error: "Oops!! something went wrong"})
            }
        }








