const { ButtonStyle } = require("discord.js");

module.exports = {
  PLAYING: {
      pause: {
          label: "Pause", // Button Name
          emoji: "⏯", // Button Emoji
          style: ButtonStyle.Success, // OPTIONS: Primary - Secondary - Success - Danger
      },
      previous: {
          label: "Previous",
          emoji: "⬅",
          style: ButtonStyle.Primary,
      },
      stop: {
          label: "Stop",
          emoji: "✖",
          style: ButtonStyle.Danger,
      },
      skip: {
          label: "Skip",
          emoji: "➡",
          style: ButtonStyle.Primary,
      },
      loop: {
          label: "Loop",
          emoji: "🔁",
          style: ButtonStyle.Success,
      },
  },
  
}