
const { MessageEmbed } = require("discord.js");
const { getVoiceConnection } = require('@discordjs/voice');

module.exports.run = async (client, interaction, args) => {
  var banner = client.config.banner

  try {
  
    let voiceConn = getVoiceConnection(interaction.member.guild.id);
    if(voiceConn) voiceConn.disconnect();

    interaction.reply({ embeds: [new MessageEmbed()
    .setDescription("📢 __**Bye Bye UwU**__")
    .setColor('#0002c2')
    .setImage(banner)]})
  } catch (e) {
    console.log(e);
  }
}

module.exports.name = "stop";
module.exports.description = "Arrêter d'écouter Radio A";
module.exports.defer = false;
module.exports.type = 1