const mongoose = require("mongoose");
const Client = require("./models/client");

mongoose
  .connect("mongodb://localhost:27017/ProjetDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const seedClients = [
  {
    nom: "Value",
    matFisc: "42484K65343465D343C78A",
    adresse: "Le Lac 1",
    tel: 27458663,
    email: "contact@value.com.tn",
    user: "62f27fe3ab51c3b1d9cc84e3",
  },
  {
    nom: "Expensya",
    matFisc: "454684GGF4654G646GFQ74",
    adresse: "Le Lac 2",
    tel: 55236997,
    email: "contact@expensya.com",
    user: "62f27fe3ab51c3b1d9cc84e3",
  },
  {
    nom: "Telnet",
    matFisc: "4568244SS457G8S5W56S4Q",
    adresse: "Technopole El Ghazela",
    tel: 41445665,
    email: "contact@telnet.tn",
    user: "62f27fe3ab51c3b1d9cc84e3",
  },
];

Client.insertMany(seedClients)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
