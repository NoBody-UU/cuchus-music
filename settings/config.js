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
        MONGO_CONNECTION: process.env.MONGO_CONNECTION|| "YOUR_MONGO_URL", // MongoDB Url
        SUPPORT_SERVER: process.env.SUPPORT_SERVER || "https://discord.gg/MqNKpdrGjw", // Your Discord Support Server 
    },

    EMBED_COLORS: 
    {
        DEFAULT: "#ffec1d", // Default Color 
        ERROR: "#fe333e", // ERROR Color
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