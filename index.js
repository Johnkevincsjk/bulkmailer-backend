const express = require('express')
const app = express()
app.use(express.json())
const PORT = 5000
const cors = require('cors')
app.use(cors())



app.use('/bulkmailer', require('./Routes/Routes'))

app.listen(PORT, () => {
    console.log('Mail server is live')
})



