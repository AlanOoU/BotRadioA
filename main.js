const { Client, Collection, Options } = require('discord.js');

(async() => {

  let client = new Client({ 
    intents: ["DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING", "GUILDS", "GUILD_BANS","GUILD_INTEGRATIONS", "GUILD_INVITES", "GUILD_MEMBERS","GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_WEBHOOKS"],
    partials: [
      'USER',
      'GUILD_MEMBER',
      'MESSAGE',
      'REACTION',
      "CHANNEL"
    ],
    makeCache: Options.cacheWithLimits({
      PresenceManager: 200,
    }),
    allowedMentions: {
      parse: ['users', 'roles'],
      repliedUser: false,
    },
  });

  accentsTidy = function (s) {
    var r = s.toLowerCase();
    r = r.replace(new RegExp(/\s/g), "");
    r = r.replace(new RegExp(/[àáâãäå]/g), "a");
    r = r.replace(new RegExp(/æ/g), "ae");
    r = r.replace(new RegExp(/ç/g), "c");
    r = r.replace(new RegExp(/[èéêë]/g), "e");
    r = r.replace(new RegExp(/[ìíîï]/g), "i");
    r = r.replace(new RegExp(/ñ/g), "n");
    r = r.replace(new RegExp(/[òóôõö]/g), "o");
    r = r.replace(new RegExp(/œ/g), "oe");
    r = r.replace(new RegExp(/[ùúûü]/g), "u");
    r = r.replace(new RegExp(/[ýÿ]/g), "y");
    r = r.replace(new RegExp(/\W/g), "");
    return r;
  };

  client.config = require("./config.js")
  client.login(client.config.token)
  client.plugins = new Collection();
  client.commands = new Collection();
  client.interactCommands = new Collection();
  client.cooldowns = new Collection();
  module.exports = client;
  require("./util/handler")(client);

})();