const express = require("express");
const cors = require("cors");

const app = express();

const initial = [
  {username: 'john',type: 'learner',password: 'john',firstname: 'john'},
  {username: 'anne',type: 'learner',password: 'anne',firstname: 'anne'},
  {username: 'tom',type: 'trainer',password: 'tom',firstname: 'tom'},
  {username: 'bob',type: 'trainer',password: 'bob',firstname: 'bob'},
]

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const { users } = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  for(var i=0; i<initial.length;i++){
    users.create(initial[i])
  }
    console.log("Drop and re-sync db.");
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});