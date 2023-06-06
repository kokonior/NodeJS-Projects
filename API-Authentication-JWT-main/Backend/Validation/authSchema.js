const Joi = require('@hapi/joi');

const LoginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
  })

  const RegisterSchema = Joi.object({
    name: Joi.string().required().min(6),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
  })


module.exports.LoginSchema = LoginSchema; 
module.exports.RegisterSchema = RegisterSchema; 