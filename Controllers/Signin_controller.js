const Signin_controller = require('express').Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv')
dotenv.config()
const user_signin_data = require('../Schema/Signin_schema');


Signin_controller.post('/createuser', async (req, res, next) => {

    const user_BYC = { ...req.body }
    const { Mailid } = user_BYC


    if (Mailid) {
        try {

            const user_exist = await user_signin_data.findOne({ Mailid })
            if (user_exist) {
                res.status(400).json({          
                    Feedback: 'User already exist',
                    user_exist
                })
            } else {
                try {
                    if (user_BYC.Password) {
                        user_BYC.Password = bcrypt.hashSync(user_BYC.Password, saltRounds);
                    }
                    const newuser = user_signin_data(user_BYC)
                    newuser.save().then((response) => {
                        if (response && response._id) {
                            return res.status(200).json({
                                Success: true,
                                Feedback: 'user created successfully',
                                response
                            })
                        } else {
                            return res.status(500).json({
                                Success: false,
                                Feedback: 'Error creating user. User data not available.',
                            })
                        }

                    })

                } catch (error) {
                    return res.status(500).json({
                        Success: false,
                        Feedback: 'Something went wrong',
                        error: error
                    })
                }

            }

        } catch (error) {
            return res.status(500).json({
                Success: false,
                Feedback: 'Error checking user existence',
                error: error
            })
        }


    }


})
module.exports = Signin_controller