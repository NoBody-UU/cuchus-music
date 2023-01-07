const { EmbedBuilder } = require("discord.js");
const { getSettings: registerGuild } = require("../../Database/schemas/Guild");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = async (client, guild) => {
  if (!guild.available) return;
  if (!guild.members.cache.has(guild.ownerId)) await guild.fetchOwner({ cache: true }).catch(() => {});
  client.logger.log(`Guild Joined: ${guild.name} Members: ${guild.memberCount}`);
  await registerGuild(guild);

  if (!client.joinLeaveWebhook) return;

  const embed = new EmbedBuilder()
    .setTitle("New Server | Discord Music Bot")
    .setThumbnail(guild.iconURL())
    .setColor(EMBED_COLORS.DEFAULT)
    .addFields(
      {
        name: "Guild Name",
        value: guild.name,
        inline: false,
      },
      {
        name: "ID",
        value: `\`${guild.id}\``,
        inline: false,
      },
      {
        name: "Owner",
        value: `${client.users.cache.get(guild.ownerId).tag} [\`${guild.ownerId}\`]`,
        inline: false,
      },
      {
        name: "Members",
        value: `\`\`\`yaml\n${guild.memberCount}\`\`\``,
        inline: false,
      }
    )
    .setFooter({ text: `Guild #${client.guilds.cache.size}` });

  client.joinLeaveWebhook.send({
    username: "New Server",
    avatarURL: client.user.displayAvatarURL(),
    embeds: [embed],
  });
};
