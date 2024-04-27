const nodemailer_controller = require('express').Router()
const nodemailer = require('nodemailer');



nodemailer_controller.post('/nodemailer', async (req, res, next) => {




    try {
        await sendMail();
        return (

            res.status(200).json({
                Feedback: 'mail sent successfully'

            }))

    } catch (error) {
        res.status(400).json({
            Feedback: 'Failed to send mail',
            error: error
        })

    }
    async function sendMail() {

        const mailSender = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'justsubscribe2021@gmail.com',
                pass: 'sxufljmzvevgrwga'
            }
        })

        const composeMail = {
            from: 'justsubscribe2021@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text

        }

        return mailSender.sendMail(composeMail, (error, info) => {
            console.log(error)
            if (error) {
                console.log(error)
            } else {
                console.log('Mail send successfully' + info.response)
            }
        })

    }






})

module.exports = nodemailer_controller


