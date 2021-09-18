module.exports = (sequelize, Sequelize) => {
    const message = sequelize.define("message", {
      message_text: {
        type: Sequelize.STRING
      },
      sender: {
        type: Sequelize.STRING
      },
      receiver: {
        type: Sequelize.STRING
      },
      randomid:{
        type: Sequelize.STRING
      }
    });
  
    return message;
  };