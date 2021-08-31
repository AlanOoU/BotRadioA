const { MessageEmbed } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');

module.exports.run = async (client, message, data) => {

  var banner = client.config.banner

  try {
  
    getVoiceConnection(message.guild.id).disconnect();
  
    message.channel.send({ embeds: [new MessageEmbed()
    .setDescription("📢 __**Bye Bye UwU**__")
    .setColor('#0002c2')
    .setImage(banner)]})
  } catch (e) {
    console.log(e);
  }

}


module.exports.help = {
  name: "leave",
  aliases: ["leave"],
  category: "Radio",
  desc: "Quitter le vocal",
  args: false,
  dev: true,
  disabled: false,
  hidden: false,
  usage: "",
  cooldown: 5,
  mPerms: [],
  bPerms: ["SEND_MESSAGES", "EMBED_LINKS"]
}