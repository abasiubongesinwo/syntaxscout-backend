const Joi = require("joi");

const userSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const validator = (payload) => {
  return userSchema.validate(payload);
};

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  
  const loginvalidator = (payload) => {
      return loginSchema.validate(payload);
    };
    
    module.exports ={ validator,loginvalidator};