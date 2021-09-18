module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      username: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      }
    });
  
    return user;
  };