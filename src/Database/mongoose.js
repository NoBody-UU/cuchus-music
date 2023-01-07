const mongoose = require("mongoose");
const { LINKS } = require("../../settings/config");
const Logger  = require("../helpers/Logger");
const chalk = require("chalk")

mongoose.set('strictQuery', true);

module.exports = {
  async initializeMongoose() {
    Logger.log(`[LOADING] DataBase(Mongoose)...`);

    try {
      await mongoose.connect( LINKS.MONGO_CONNECTION, {
        keepAlive: true,
      });

      Logger.success(chalk.green("[Mongoose] Database connection established"));

      return mongoose.connection
    } catch (error) {
      Logger.error("[Mongoose] Failed to connect to DataBase:", error);
      process.exit();
    }
  },

  schemas: {
    Guild: require("./schemas/Guild"),
    User: require("./schemas/User.js")
  },
};
