/**
 * @typedef {Object} CommandData
 * @property {Object} config - The config of command
 * @property {string} config.name - The name of command
 * @property {string[]} config.aliases - The aliases of command
 * @property {"utilities"|"owner"|"music"|"filters"} config.category - The category of command
 * @property {string} config.description - The description of command
 * @property {"Admin"|"Members"|"Owner"} config.accessableby - The role of discord that can access to command, being Members for users, Admin for server managers and Owner for the bot owner
 */

/**
 * @type {CommandData}
 */
module.exports = {
  config: {
      name: "example-command",
      aliases: ["example", "ex"],
      category: "",
      description: "This is an example command for demonstration purposes.",
      accessableby: "Members"
  },

  /**
   * @param {import('discord.js').Message} message - the message object that triggered the command
   */
  run: async (client, message, args) => {
    // code here 
  },
}
