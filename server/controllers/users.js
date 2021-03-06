const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const fetch = require('node-fetch');
const {getTask}=require('../helpers/taskApi');
const todo=require('../models/db.json');

signToken = user => {
  return JWT.sign({
    iss: 'siyandiza',
    sub: user.id,    
    iat: new Date().getTime(), // current time
    exp: new Date().setDate((new Date().getDate() + 1)) // current time + 2 day ahead
  }, JWT_SECRET);
}

module.exports = {
  // signUp: async (req, res, next) => {
  //   const { email, password } = req.value.body;

  //   // Check if there is a user with the same email
  //   const foundUser = await User.findOne({ "local.email": email });
  //   if (foundUser) {
  //     return res.status(403).json({ error: 'Email is already in use'});
  //   }

  //   // Create a new user
  //   const newUser = new User({
  //     method: 'local',
  //     local: {
  //       email: email,
  //       password: password
  //     }
  //   });

  //   await newUser.save();

  //   // Generate the token
  //   const token = signToken(newUser);
  //   // Respond with token
  //   res.status(200).json({ token });
  // },
  googleCreate: async (req, res, next) => {
    const { email, name,surname,role,region,manager,employer,google_id } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use'});
    }

    // Create a new user
    const newUser = new User({
      method: 'google',
      google: {
        email: email,
        name:name,
        surname:surname,
        role:role,
        region:region,
        manager:manager,
        employer:employer,
        google_id:google_id
      }
    });
    console.log("user", newUser);

    await newUser.save();

    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    res.status(200).json({ token });
  },

  // signIn: async (req, res, next) => {
  //   // Generate token
  //   const token = signToken(req.user);
  //   res.status(200).json({ token });
  // },

  googleOAuth: async (req, res, next) => {
    console.log("req user ",req.user);
    
    
    const {region}=req.user.google
    console.log("user.google region <<<< ----- >>>>>> ",req.user.google.region);
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token:token,usename:req.user.google.email,
      imageUrl:"http://xxxxxxx",role:req.user.google.role,region:region });
  },

  // facebookOAuth: async (req, res, next) => {
  //   // Generate token
  //   const token = signToken(req.user);
  //   res.status(200).json({ token });
  // },

  // secret: async (req, res, next) => {
  //   console.log('I managed to get here!');
  //   res.json({ secret: "resource" });
  // },
  // task: async (req,res,next)=>{

  //   const url =
  //   "${baseUrl}/engine-rest/task?assignee=demo";
  // // fetch(url)
  // //   .then(response => {
  // //     response.json().then(json => {
  // //       console.log(
  // //         `Name: ${json[0].name} -`,
  // //         `created: ${json[0].created} -`,
  // //         `assignee: ${json[0].assignee}`
  // //       );

  // //       res.json({Name:json[0].name,Created:json[0].created,Assignee:json[0].assignee});
  // //     });
  // //   })
  // //   .catch(error => {
  // //     console.log(error);
  // //   });
  // res.json(todo);
  //   }
}
