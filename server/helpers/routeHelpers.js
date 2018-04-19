const BaseJoi = require('joi');
const Enums = require('joi-enums-extension');
const JoiEnum = BaseJoi.extend(Enums);
const Joi = require('joi');


const ownershipType={"CC":1,"PTY (LTD)":2,"SOLE OWNER":3,"TRUST":4};
const provinceArry={"Gauteng":1,"KwaZulu Natal":2,"Western Cape":3,
"North Cape":4,"Eastern Cape":5,"Limpopo":6,"Free State":7
,"Mpumalanga":8,"North West":9};

const fundNameArry={"Sick Pay Fund":1,"Dispute Levy":2,
"EIPF":3,"LCD":4,"MIPF":5,"Tech Fund":6,"Tech Vat":7,"Volintary Leave Pay":8,
"Admin Levy":9,"Board Levy":10,"CBL Employee":11,"CBL Employe":12,"Not Used":13};
const registratioIndexArry={"Exempted":1,"Never Registered":2,"Registered":3}

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
    firmSchema: Joi.object().keys({
      region:Joi.string(),
      zone:Joi.string(),
      contact:Joi.string(),
      email: Joi.string().email(),
      name: Joi.string().required(),
      tradingAs: Joi.string(),
      managingDirector: Joi.string(),
      ownershipType: JoiEnum.number().map(ownershipType),
      vatNumber: Joi.string(),
      tel: Joi.string(),
      mobile: Joi.string(),
      fax:Joi.string(),
      vatNumber: Joi.string(),
      physicalAddress:Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        city: Joi.string(),
        province:JoiEnum.number().map(provinceArry)        
      }),
      postalAddress:Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        city: Joi.string(),
        province:JoiEnum.number().map(provinceArry),
        code: Joi.number()        
      }),
      councilFunds:Joi.object(
        {
          fundName:JoiEnum.number().map(fundNameArry),
          registrationIndex:JoiEnum.number().map(registratioIndexArry),
          dateLiable:Joi.date(),
          dateExemptionFrom:Joi.date(),
          dateExemptionTo:Joi.date(),
          exemptionReason:Joi.string(),
          paymentFromDate:Joi.date(),
          paymentToDate:Joi.date()

        }
      )

    })
  }
}
