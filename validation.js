const Joi = require('@hapi/joi')

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return schema.validate(data)
  // res.send(error)
  //   if (error !== 'undefined') {
  //     return res.status(400).send(error.details[0].message)
  //   }
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return schema.validate(data)
  // res.send(error)
  // if (error !== 'undefined') {
  //   return res.status(400).send(error.details[0].message)
  // }
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
