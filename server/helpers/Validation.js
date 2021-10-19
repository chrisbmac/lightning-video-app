const Email_Validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const Password_Validation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
)

const validateEmail = (email) => {
    return Email_Validation.test(String(email).toLowerCase())
}
const validatePassword = (password) => {
    return Password_Validation.test(String(password))
}

module.exports = {validateEmail, validatePassword}