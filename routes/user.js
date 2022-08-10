//Librairies à appeler
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const methodOverride = require("method-override");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const morgan = require("morgan");

//modèles à appeler
const User = require("../models/user");

//Créer application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: true });

//Usage de forçage de méthode CRUD dans un formulaire HTML
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Usage du middleware morgan pour affocher le statut et le type de requette effectuée
app.use(morgan("dev"));

/* _________________________________clientENTIFICATION (USER)___________________________________ */

// Interface principale
router.get("/", (req, res) => {
  res.render("users/auth");
});

// Ajout d'un utilisateur
router.get("/users/register", (req, res) => {
  res.render("users/register");
});

router.post("/users/register", urlencodedParser, async (req, res) => {
  const newUser = new User(_.pick(req.body, ["nom", "email", "password"]));
  console.log(newUser);
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();
  console.log(newUser);
  const token = newUser.generateTokens();
  console.log(`User token: ${token}`);
  res.header("x-auth-token", token).redirect(`/clients/${newUser._id}`);
});

// Connection d'un utilisateur déjà affecté à la collection users
router.get("/users/login", (req, res) => {
  res.render("users/login");
});

router.post("/users/login", urlencodedParser, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!user || !checkPassword) {
    return res.status(404).send("Invalid email or password");
  }
  console.log(user);
  const token = user.generateTokens();
  console.log(`User token: ${token}`);
  res.header("x-auth-token", token).redirect(`/clients/${user._id}`);
});

// Export du routeur dossier
module.exports = router;
