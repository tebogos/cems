const JWT = require('jsonwebtoken');
const Firm = require('../models/firm');
const { JWT_SECRET } = require('../configuration');
const fetch = require('node-fetch');
const {getTask}=require('../helpers/taskApi');
const moment =require('moment');

signToken = user => {
  return JWT.sign({
    iss: 'siyandiza',
    sub: user.id,    
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  
  saveFirm: async (req, res, next) => {
    const {region,zone,  name,tradingAs,managingDirector,contact,ownershipType
        ,vatNumber,tel,mobile,email,fax,physicalAddress,postalAddress,councilFunds } = req.body;

const firmNumber=region+zone+moment().year()+moment().month()+moment().day()+
moment().hour()+moment().minute()+moment().second();
    // Check if there is a user with the same email
    const foundFirm = await Firm.findOne({ "firmNumber": firmNumber });
    if (foundFirm) {
      return res.status(403).json({ error: 'Firm number is already in use'});
    }
console.log("firmnumber 00---00----111-->",firmNumber);

    // Create a new user
    const newFirm = new Firm({      
      
        firmNumber: firmNumber,
        name:name,
        tradingAs:tradingAs,
        managingDirector:managingDirector,
        contact:contact,
        ownershipType:ownershipType,
        vatNumber:vatNumber,
        tel:tel,
        mobile:mobile,
        email:email,
        fax:fax,
        physicalAddress:physicalAddress,
        postalAddress:postalAddress,
        councilFunds:councilFunds
      }
    );
    console.log("user", newFirm);

    await newFirm.save();

    
    res.status(200).json({ status:"Firm successfuly created" });
  },
  getFirm:(req,res)=>{
    console.log("req.query ",req.query);
    
    const {firmName}=req.query;
    console.log("frimName ",firmName);
    

    Firm.find().
    where('name').regex(firmName).      
    limit(200).
    sort('-name').
    select('name firmNumber').
    exec((err,result)=>{
      if(err)           
         res.status(500);
      res.status(200).json(result);
    });

  }

  
}
