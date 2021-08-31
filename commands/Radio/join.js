const { MessageEmbed } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports.run = async (client, message, data) => {

  if (!message.member.permissions.has('VIEW_CHANNEL'))
    return message.channel.send("*You do not have permission to use this command.* **[ MANAGE_GUILD ]**")

  var banner = client.config.banner;

  try {
    const player = createAudioPlayer();
  
    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
    });
  
    let resource = createAudioResource(client.config.streamurl, { inlineVolume: true });
  
    const subscription = connection.subscribe(player);
    let dispatcher = player.play(resource);
    
    message.channel.send({embeds: [
      new MessageEmbed()
        .setColor('#0002c2')
        .setDescription("📢 __**Bonne seance d ecoute avec Radio A UwU**__")
        .setImage(banner)]}
  
    )
  } catch (e) {
    console.log(e);
  }


}


module.exports.help = {
  name: "join",
  aliases: ["join"],
  category: "Radio",
  desc: "Rejoindre le vocal",
  args: false,
  dev: true,
  disabled: false,
  hidden: false,
  usage: "",
  cooldown: 5,
  mPerms: [],
  bPerms: ["SEND_MESSAGES", "EMBED_LINKS"]
}