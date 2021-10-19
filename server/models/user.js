const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.db_application_connecton;

//mongoose will que work if connection not established  
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err))

const User_Schema = new mongoose.Schema({
    fname: {type: String},
    lname: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    authenticated: {type: Boolean}
})

module.exports = mongoose.model('lightning-users', User_Schema)