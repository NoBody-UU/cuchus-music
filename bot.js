const { Client, Collection, GatewayIntentBits, WebhookClient } = require("discord.js");
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { I18n } = require("@hammerhq/localization");
const Logger = require("./src/helpers/Logger");
const { initializeMongoose } = require("./src/Database/mongoose");
const { LINKS, TOKEN } = require("./settings/config.js");

class MainClient extends Client {
    constructor() {
        super({
            shards: "auto",
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent,
            ],
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
        });

        // find unhandled Rejections and Uncaught Exception
        process.on("unhandledRejection", (err) => client.logger.error(`Unhandled exception`, err));
        process.on("uncaughtException", (err) => client.logger.error(`Uncaught Exception`, err));

        this.config = require('./settings/config.js');
        this.prefix = this.config.PREFIX;
        this.owner = this.config.OWNER_ID;
        // Language is future feature...
        this.i18n = new I18n(this.config.LANGUAGE);
        this.logger = Logger;
        this.joinLeaveWebhook = LINKS.JOIN_LEAVE_LOGS ? new WebhookClient({ url: LINKS.JOIN_LEAVE_LOGS }) : undefined;
        //  initialize the database
        initializeMongoose();

        const client = this;

        this.distube = new DisTube(client, {
            searchSongs: 0, /// SET TO 5 FOR ENABLE SEARCH MODE!
            searchCooldown: 30,
            leaveOnEmpty: true,
            emptyCooldown: 60,
            leaveOnFinish: false,
            leaveOnStop: true,
            plugins: [
                new SoundCloudPlugin(),
                new SpotifyPlugin({
                    emitEventsAfterFetching: true
                }),
                new YtDlpPlugin()],
        });

        ["aliases", "commands"].forEach(x => client[x] = new Collection());
        ["loadCommands", "loadEvents", "loadDistube"].forEach(x => require(`./src/handlers/${x}`)(client));
    
    }
       
    
    
    connect() {
        return super.login(TOKEN);
        
    };
};
module.exports = MainClient;
