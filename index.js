const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const port = process.env.PORT


app.use('/bulkmailer', require('./Routes/Routes'))

app.listen(port, () => {
    console.log('Mail server is live')
})



