module.exports = app => {
    const messages = require("../controllers/message.controller.js");
  
    var router = require("express").Router();
  
    // Create a new message
    router.post("/", messages.create);
  
    // Retrieve all messages
    router.get("/", messages.findAll);
  
    // Retrieve all published messages
    router.get("/published", messages.findAllPublished);
  
    // Retrieve a single message with id
    router.get("/:id", messages.findOne);
  
    // Update a message with id
    router.put("/:id", messages.update);
  
    // Delete a message with id
    // router.delete("/:randomid", messages.delete);

    // Delete a message with randomid
    router.get("/delete/:randomid",messages.delete);
  
    // Delete all messages
    router.delete("/", messages.deleteAll);
  
    app.use('/api/messages', router);
  };