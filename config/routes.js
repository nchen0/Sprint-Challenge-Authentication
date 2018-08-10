const axios = require("axios");
const database = require("../database/dbConfig.js");
const bcrypt = require("bcrypt");

const { authenticate, generateToken } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  console.log("user is: ", user);
  if (!user.username || !user.password) {
    res.status(401).json({ error: "Please enter a username and password." });
  }
  try {
    const ids = await database.insert(user).into("users");
    try {
      const newUser = await database("users")
        .where({ id: ids[0] })
        .first();
      const token = generateToken(newUser);
      res.status(201).json(token);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  // implement user login
  const credentials = req.body;
  const username = credentials.username;
  try {
    const getUser = await database
      .select()
      .from("users")
      .where({ username })
      .first();
    if (getUser && bcrypt.compareSync(credentials.password, getUser.password)) {
      const token = generateToken(getUser);
      res.send(token);
    } else {
      res.status(400).json({ error: "Incorrect credentials, you shall not pass!" });
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

function getJokes(req, res) {
  axios
    .get("https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten")
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
