const db = require("../models");
const messages = db.messages;
const Op = db.Sequelize.Op;
const crypto = require("crypto");

// Create and Save a new message
exports.create = (req, res) => {
    // Validate request
    // console.log(req.body)
    if (!req.body.message) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a message
    if(!req.body.randomid){
      const message = {
        message_text: req.body.message,
        sender: req.body.sender,
        receiver: req.body.receiver,
        
      };
      crypto.randomBytes(8, async(err, buf) => {
        if (err) {
          // Prints error
          console.log(err);
          return;
        }
        // Prints random bytes of generated data
        console.log("The random data is: "
                   + buf.toString('hex'));
  
        message['randomid'] = buf.toString('hex')
        if(message['randomid']){
          // Save message in the database
          messages.create(message, { fields: ['message_text', 'sender','receiver','randomid'] })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the message."
            });
          })
        }  
    })
    }else{
      const message = {
        message_text: req.body.message,
        sender: req.body.sender,
        receiver: req.body.receiver,
        randomid: req.body.randomid
      };
      messages.create(message, { fields: ['message_text', 'sender','receiver','randomid'] })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the message."
            });
          })
    }
    
}
// Retrieve all messages from the database.
exports.findAll = (req, res) => {
    var message = req.body.message;
    console.log(message);
    var condition = message ? { message: { [Op.like]: `%${messagename}%` } } : null;
  
    messages.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving messages."
        });
      });
  };

exports.findAllbyName = (req,res)=>{
  var sender = req.params.name;
  var receiver = req.params.name;
  messages.findAllbyName({where: {sender: sender, receiver: receiver}})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving messages."
    });
  })
}

// Find a single message with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    messages.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving message with id=" + id
        });
      });
  };

// Update a message by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    message.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "message was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update message with id=${id}. Maybe message was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating message with id=" + id
        });
      });
  };

// Delete a message with the specified id in the request
exports.delete = (req, res) => {
    const randomid = req.params.randomid;
  
    messages.destroy({
      where: { randomid: randomid }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "message was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete message with randomid=${randomid}. Maybe message was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete message with randomid=" + randomid
        });
      });
  };

// Delete all messages from the database.
exports.deleteAll = (req, res) => {
    message.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} messages were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all messages."
        });
      });
  };

// Find all published messages
exports.findAllPublished = (req, res) => {
    message.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving messages."
        });
      });
  };