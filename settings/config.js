require("dotenv").config();
const { resolve } = require("path");

module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // TOKEN BOT
    BOT_ID: process.env.BOT_ID || "BOT_ID", // BOT ID
    PREFIX: process.env.PREFIX || "-", // Bot Prefix (Default is "-" )
    OWNER_ID: process.env.OWNER_ID || "OWNER_ID", // Owner ID

    LINKS: {
        JOIN_LEAVE_LOGS: process.env.JOIN_LEAVE_LOGS || "xxx", // Webhook join & leave guilds
        ERROR_LOGS: process.env.ERROR_LOGS || "xxx", // Webhook link for Error Logs
        SUPPORT_SERVER: process.env.SUPPORT_SERVER || "https://discord.gg/MqNKpdrGjw", // Your Discord Support Server 
    },

    EMBED_COLORS: 
    {
        DEFAULT: "#ffec1d", // Default Color 
        ERROR: "#fe333e", // ERROR Color
    },

    MUSIC: {
      searchSongs: 0, // SET TO 5 FOR ENABLE SEARCH MODE!
      searchCooldown: 30, // Built-in search cooldown in seconds (When searchSongs is bigger than 0). 
      leaveOnEmpty: true, // Whether or not The Bot leaving voice channel if the voice channel is empty(emptyCooldown).
      emptyCooldown: 60, // Built-in leave on empty cooldown in seconds (When leaveOnEmpty is true).
      leaveOnFinish: false, // Whether or not The Bot leaving voice channel when the queue ends.
      leaveOnStop: true, // Whether or not The Bot leaving voice channel after using stop command.
    },

    CACHE_SIZE: {
        GUILDS: 100,
        USERS: 10000,
        MEMBERS: 10000,
      },

   // Language: ignore this session
   LANGUAGE: {
    defaultLocale: "en", // Default Language
    directory: resolve("langs"),
  },
}

/*
╔═════════════════════════════════════════════════════╗
║    || - ||   Developed by NoBody#9666   || - ||     ║
║    ----------| discord.gg/FMbXwGPJGm |---------     ║
╚═════════════════════════════════════════════════════╝
*/