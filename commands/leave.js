const Discord = require("discord.js");
const config = require('../config.json');


module.exports = {
    run: async (message, args) => {
    if (!message.member.hasPermission('VIEW_CHANNEL'))
        return message.channel.send(new Discord.MessageEmbed()
        .setDescription('*You do not have permission to use this command.* **[ MANAGE_GUILD ]**')
        .setColor('#2F3136'))
        
        var banner = config.banner
        
        message.guild.me.voice.channel.leave()
        message.channel.send(new Discord.MessageEmbed()
        .setDescription("📢 __**Bye Bye UwU**__")
        .setColor('#0002c2')
        .setImage(banner)

        )
      },

  name: 'leave',
  guildOnly: true
}
