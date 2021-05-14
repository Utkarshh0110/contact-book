const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const fast2sms = require('fast-two-sms')
require('dotenv').config()
const generateOTP = require('./helper/util.js')
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("HELLO TO API")
})

app.post('/sendmessage', async (req, res) => {
    var options = {authorization : process.env.API_KEY , message : req.body.messageText ,  numbers : [req.body.mobile]} 
    const response = await fast2sms.sendMessage(options)
    res.send(response.message)
})


app.post('/otp', async (req, res) => {
    const otp = `Your OTP is ${generateOTP()}`;
    var options = {authorization : process.env.API_KEY , message : otp ,  numbers : [req.body.mobile]} 
    const response = await fast2sms.sendMessage(options)
    res.send(response.message)
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

