const Auth_route = require('express').Router()
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken');
const user_signin_data = require('../Schema/Signin_schema');


// The below code is to get all the users data.
Auth_route.get('/getusers', (req, res, next) => {
    user_signin_data.find().then((response) => {
        return res.status(200).json({
            Feedback: "All Data fetched",
            response
        })
    })

})

//The below code is to create new users and store at DB.

Auth_route.use('/api', require('../Controllers/Signin_controller'))



// The below code is for users login , which helps to check whether the user data exist in DB.


Auth_route.post('/Login', (req, res, next) => {
    const { Mailid, Password } = req.body
    user_signin_data.findOne({ Mailid: Mailid }).
        then((response) => {
            if (response && response._id) {
                if (bcrypt.compareSync(Password, response.Password)) {
                    const token = jwt.sign({ Role: ['user'] }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 10 });
                    return res.status(200).json({
                        Feedback: 'Log In successfull',
                        token


                    })

                } else {
                    return res.status(401).json({
                        Feedback: 'Mail id or password is invaild',

                    })

                }
            } else {
                return res.status(401).json({
                    Feedback: "Account does not exist"
                })
            }
        }).catch((err) => {
            return res.status(500).json({
                Feedback: 'Something went wrong',
                err
            })
        })


})


Auth_route.use('/api', require('../Controllers/Nodemailer_controller'))


module.exports = Auth_route
