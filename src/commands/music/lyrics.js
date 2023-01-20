const lyricsfinder = require('lyrics-finder');
const { EmbedBuilder } = require('discord.js');
const { EMBED_COLORS } = require('../../../settings/config');

module.exports = { 
    config: {
        name: "lyrics",
        aliases: ["lys"],
        description: "Display lyrics of a song",
        accessableby: "Member",
        category: "music",
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
  run: async (client, message, args) => {
        const msg = await message.channel.send("⏳ **| Searching for lyrics...**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`❌ **| ❌ **| There is nothing in the queue right now!****`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("❌ **| You need to be in a same/voice channel.**")

        let song = args.join(" ");
            let CurrentSong = queue.songs[0];
        if (!song && CurrentSong) song = CurrentSong.name;

        let lyrics = null;

        try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) msg.edit("❌ **| Couldn't find any lyrics for that song!**");
        } catch (err) {
            console.log(err);
            msg.edit("❌ **| Couldn't find any lyrics for that song!**");
        }
        let lyricsEmbed = new EmbedBuilder()
            .setColor(EMBED_COLORS.DEFAULT)
            .setTitle(`Lyrics`)
            .setDescription(`**${song}**\n${lyrics}`)
            .setFooter({ text: `Requested by ${message.author.username}`})
            .setTimestamp();

        if (lyrics.length > 3000) {
            lyricsEmbed.setDescription("❌ **| Lyrics too long to display!**");
        }

        msg.edit({ content: ' ', embeds: [lyricsEmbed] })
        .then(n => {
            var total = queue.songs[0].duration * 2000;
            var current = queue.currentTime * 2000;
            let time = total - current;
            setTimeout(() => { msg.delete(); }, time);
        });
    }
};

