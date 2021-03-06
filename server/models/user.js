/* USER MONGOOSE MODEL  */
const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userShema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 50,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// virtuel field for password hashing

userShema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userShema.methods = {
  authenticate: function (planText) {
    return this.encryptPassword(planText) == this.hashed_password;
  }, // compare password and hashed password

  encryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }, // encrypt password using salt from model
};

module.exports = mongoose.model("User", userShema);
