const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const regexp = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: regexp,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 1024,
  },
  isAdmin: {
    type: Boolean,
  },
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
});

userSchema.methods.generateTokens = () => {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    "privatekey"
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
