const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    userSchema:Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      role:Joi.string().required(),
      surname:Joi.string().required(),
      manager:Joi.string(),
      region:Joi.string().required(),
      employer:Joi.string(),
      google_id:Joi.string(),
      taskSchema: Joi.object().keys({
        name: Joi.string().required(),
        isComplete: Joi.boolean().required()
      })


    }),
  }
}
