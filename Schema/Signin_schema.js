
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://johnkevincsjk:DD03fJEDMPycUIrY@bulkmailercluster.xoxal0d.mongodb.net/bulkmailerdb')

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