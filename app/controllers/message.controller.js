const db = require("../models");
const messages = db.messages;
const Op = db.Sequelize.Op;

// Create and Save a new message
exports.create = (req, res) => {
    // Validate request
    if (!req.body.messagename) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a message
    const message = {
      messagename: req.body.messagename,
      password: req.body.password,
      type: req.body.type,
      firstname: req.body.firstname
    };
  
    // Save message in the database
    messages.create(message, { fields: ['messagename', 'password','type','firstname'] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the message."
        });
      });
  };

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
    var messagename = req.body.messagename;
    console.log(messagename);
    var condition = messagename ? { messagename: { [Op.like]: `%${messagename}%` } } : null;
  
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
    const id = req.params.id;
  
    message.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "message was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete message with id=${id}. Maybe message was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete message with id=" + id
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