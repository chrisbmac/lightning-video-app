//import {validateEmail, validatePassword} from './helpers/Validation.js'
const {validateEmail, validatePassword} = require('./helpers/Validation.js')
const express = require('express');
const cors = require('cors');
const USER = require('./models/user')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/authenticate/:email', async(req, res) => {
  if(!req.params.email) throw Error('No email provided')
  try {
    const email = req.params.email.toLowerCase()
    const account = await USER.findOne({email: email}).exec();
    if(!account) return res.json({pass_status: 'failed', msg: 'That account could not be found. Check your password and email to make sure they are correct.'}) 
    account.pass = 'passed'
    account.msg = 'Successfully logged in'
    res.json(account)
  } catch(err) {
    console.log('Error signing in', err)
  }
})

app.post('/createaccount', async(req, res) => {
  try {
    if(!validateEmail(req.body.email)) return {pass_status: 'failed', msg: 'The email you provided is not a valid email.'}
    if(!validatePassword(req.body.password)) return {pass_status: 'failed', msg: 'The password you provided in invalid.'}
    const email = req.body.email.toLowerCase()
    const create = await USER.create({email: email, password: req.body.password, lname: req.body.lastName, fname: req.body.firstName})
    if(create) {
      create.pass = 'passed'
      create.msg = 'Successfully created a account.'
    }
    res.json(create)
  } catch(err) {
    console.log('ERR IN CREATE ACCOUNT', err)
  }
})

app.post('/guest', async(req, res) => {
  try {
    res.json('Guest Session')
  } catch(err) {
    console.log('Error create guest')
  }
})

app.listen(PORT,() => {
    console.log('Server Listening on Port:', PORT)
})
