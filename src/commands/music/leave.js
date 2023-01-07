const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require('../../../settings/config');

module.exports = {
    config: {
        name: "leave",
        aliases: ["lev", "stop", "dc"],
        description: "Makes the bot leave the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("⏳ **Processing.....**");
        const queue = client.distube.getQueue(message);
        
		if (!queue) return msg.edit(`❌ **| There is nothing in the queue right now!**`)
        const clientVoice = message.guild.members.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice === memberVoice) {
            if (queue) {
                client.distube.stop(message);
                client.distube.voices.leave(message.guild);
            } else {
                client.distube.voices.leave(message.guild);
            }

            const embed = new EmbedBuilder()
                .setDescription(`🏃‍♂️ **| Left: |** \`${memberVoice.name}\``)
                .setColor(EMBED_COLORS.DEFAULT)

            msg.edit({ content: ' ', embeds : [embed] });

        }

    }
}


