const { EmbedBuilder} = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

/**
 * @type {import("../../structures/cmd")}
 */
module.exports = {
    config: {
        name: "ping",
        aliases: [],
        category: "utilities",
        description: "pong!",
        accessableby: "Members"
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
  run: async (client, message, args) => {
        
        let msg = await message.channel.send({
            embeds: [
              new EmbedBuilder()
                .setDescription("🏓 | **Fetching ping...**")
                .setColor(EMBED_COLORS.DEFAULT),
            ],
          });
      
          let zap = "⚡";
          let green = "🟢";
          let red = "🔴";
          let yellow = "🟡";
      
          var botState = zap;
          var apiState = zap;
      
          let apiPing = message.client.ws.ping;
          let botPing = Math.floor(msg.createdAt - message.createdAt);
      
          if (apiPing >= 40 && apiPing < 200) {
            apiState = green;
          } else if (apiPing >= 200 && apiPing < 400) {
            apiState = yellow;
          } else if (apiPing >= 400) {
            apiState = red;
          }
      
          if (botPing >= 40 && botPing < 200) {
            botState = green;
          } else if (botPing >= 200 && botPing < 400) {
            botState = yellow;
          } else if (botPing >= 400) {
            botState = red;
          }
      
          msg.delete();
          message.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("🏓 | Pong!")
                .addFields(
                  {
                    name: "API Latency",
                    value: `\`\`\`yml\n${apiState} | ${apiPing}ms\`\`\``,
                    inline: true,
                  },
                  {
                    name: "Bot Latency",
                    value: `\`\`\`yml\n${botState} | ${botPing}ms\`\`\``,
                    inline: true,
                  }
                )
                .setColor(EMBED_COLORS.DEFAULT)
                .setFooter({ text: `Requested by ${message.author.tag}}`,}),
            ],
          });
        },
}

