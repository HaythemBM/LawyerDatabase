const mongoose = require("mongoose");
const regexp = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

const clientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  matFisc: {
    type: String,
    required: true,
    unique: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
    required: true,
    min: 11111111,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: regexp,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dossiers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dossier",
    },
  ],
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
