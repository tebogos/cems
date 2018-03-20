const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  google: {

    email: {
      type: String,
      lowercase: true
    },
    name: {
      type: String
    },
    surname: {
      type: String
    },
    role: {
      type: String,

    },
    manager: {
      type: String
    },
    employer: {
      type: String
    },
    google_id: {
      type: String
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});

userSchema.pre('save', async function(next) {
  try {
    console.log('entered');
    if (this.method !== 'local') {
      next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    // Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    console.log('exited');
    next();
  } catch(error) {
    next(error);
  }
});
userSchema.pre('update', async function(next) {
  try {
    console.log('entered-Update_salt');
    console.log("this.method",this);
    if (this.method !== 'local') {
      if(this.method === 'google'){
        const salt = await bcrypt.genSalt(10);
        const google_idHash = await bcrypt.hash(this.google.google_id, salt);
        console.log("google_idHash",google_idHash);
        this.google.google_id=google_idHash;
      }
      next();
    }

    console.log('exited-Update_salt');
    next();
  } catch(error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch(error) {
    throw new Error(error);
  }
}

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
