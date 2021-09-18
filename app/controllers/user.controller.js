const db = require("../models");
const users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a user
    const user = {
      username: req.body.username,
      password: req.body.password,
      type: req.body.type,
      firstname: req.body.firstname
    };
  
    // Save user in the database
    users.create(user, { fields: ['username', 'password','type','firstname'] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
  };

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    var username = req.body.username;
    console.log(username);
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
  
    users.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    users.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id=" + id
        });
      });
  };

// Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    user.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
  };

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    user.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
  };

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    user.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
  };

// Find all published users
exports.findAllPublished = (req, res) => {
    user.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };