const { MessageEmbed } = require('discord.js')
const config = require('../config.json');


module.exports = {
    run: async (message, args) => {
    
    
        if (!message.member.hasPermission('VIEW_CHANNEL'))
        return message.channel.send("*You do not have permission to use this command.* **[ MANAGE_GUILD ]**")

	var banner = config.banner

    message.member.voice.channel.join().then(connection => {
      connection.play(config.streamurl)
      message.channel.send(
        new MessageEmbed()
          .setColor('#0002c2')
          .setDescription("📢 __**Bonne seance d ecoute avec Radio A UwU**__")
          .setImage(banner)

      )
    })
  },

  name: 'join',
  guildOnly: true
}
