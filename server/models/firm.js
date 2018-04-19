const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const provinceArry=["Gauteng","KwaZulu Natal","Western Cape",
"North Cape","Eastern Cape","Limpopo","Free State"
,"Mpumalanga","North West"];
const fundNameArry=["Sick Pay Fund","Dispute Levy",
"EIPF","LCD","MIPF","Tech Fund","Tech Vat","Volintary Leave Pay",
"Admin Levy","Board Levy","CBL Employee","CBL Employe","Not Used"];
const registratioIndexArry=["Exempted","Never Registered","Registered"]

const ownershipTypeArray=["CC","PTY (LTD)","SOLE OWNER","TRUST"];
// Create a schema
const firmSchema = new Schema({  
    firmNumber:{
      type:String,
      require:true
    },
    name: {
      type: String,
      lowercase: true
    },
    tradingAs: {
      type: String
    },
    managingDirector: {
      type: String
    },
    contact: {
      type: String,

    },
    ownershipType:  {
        type: String,
        uppercase: true,
        required: true,
        enum: ownershipTypeArray
    },
    vatNumber: {
      type: String
    },
    tel: {
      type: String
    },
    mobile: {
        type: String
      },
      email: {
        type: String
      },
      fax: {
        type: String
      },
      physicalAddress: {
        street: String,
        city: String,
        province:  {
            type: String,
            required: true,
            enum: provinceArry
        }
        
    },
    postalAddress: {
        street: String,
        city: String,
        province: {
            type: String,
            required: true,
            enum: provinceArry
        },
        code: Number
    },
    councilFunds:[{
        fundName:{
            type: String,
            required: true,
            enum: fundNameArry
        },
        registrationIndex:{
            type: String,
            required: true,
            enum: registratioIndexArry
        },
        dateLiable:Date,
        dateExemptionFrom:Date,
        dateExemptionTo:Date,
        exemptionReason:String,
        paymentFromDate:Date,
        paymentToDate:Date
    }]
  }  
);



// Create a model
const Frim = mongoose.model('firm', firmSchema);

// Export the model
module.exports = Frim;
