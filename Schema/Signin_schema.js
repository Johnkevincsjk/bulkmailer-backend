
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Bulkmailer_Signin')

const signin_schema = new mongoose.Schema({

    Full_name: {
        type: String,
        required: true
    },
    Mailid: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }

})

const Signin_model = mongoose.model("Bulkmailer_Signin", signin_schema)

module.exports = Signin_model