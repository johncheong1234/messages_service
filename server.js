const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

var initial = [
  {sender: 'john',receiver: 'bob',message_text: 'Hi Bob, John here'},
  {sender: 'bob',receiver: 'john',message_text: 'Hi John, Bob here'},
  {sender: 'anne',receiver: 'tom',message_text: 'Hi Tom, Anne here'},
  {sender: 'anne',receiver: 'john',message_text: 'Hi John, Anne here'},
]

const app = express(); 

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const { messages } = require("./app/models");
db.sequelize.sync({ force: true }).then(async() => {
  
  for(const element of initial){
    crypto.randomBytes(8, async(err, buf) => {
      if (err) {
        // Prints error
        console.log(err);
        return;
      }
      
      // Prints random bytes of generated data
      console.log("The random data is: "
                 + buf.toString('hex'));

      element['randomid'] = buf.toString('hex')
      if(element['randomid']){
        messages.create(element)
      }
    });
  }
    console.log("Drop and re-sync db.");
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/message.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});