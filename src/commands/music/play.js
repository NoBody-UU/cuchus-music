const { PermissionsBitField } = require("discord.js");

module.exports = {
    config: {
        name: "play",
        aliases: ["pplay", "p"],
        description: "Plays a song from the source.",
        accessableby: "Member",
        category: "music",
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
  run: async (client, message, args) => {
       message.channel.send(`⏳ **Processing:**  \`${args.join(" ")}\``).then(msg => {
            setTimeout(() => msg.delete(), 5000)
        })

        const { channel } = message.member.voice;
        if (!channel) return message.reply("❌ **| You need to be in voice channel.**")
        if (!channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.Flags.Connect)) return message.channel.send(`I don't have perm \`CONNECT\` in ${channel.name} to join voice!`);
        if (!channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.Flags.Speak)) return message.channel.send(`I don't have perm \`SPEAK\` in ${channel.name} to join voice!`);

        const string = args.join(" ");
        if (!string) return message.channel.send("Please provide a song name or link.");

        const options = {
            member: message.member,
            textChannel: message.channel,
            message
        }

        await client.distube.play(message.member.voice.channel, string, options);
    }
}