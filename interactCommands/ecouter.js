
const { MessageEmbed } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
let fetch = require('node-fetch');

module.exports.run = async (client, interaction, args) => {
  var banner = client.config.banner;

  try {
    const player = createAudioPlayer();

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.member.guild.id,
      adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
    });

    let resource = createAudioResource(client.config.streamurl, { inlineVolume: true });

    const subscription = connection.subscribe(player);
    let dispatcher = player.play(resource);

    let titre = fetch('https://manager6.streamradio.fr:2320/status-json.xsl?mount=/stream').then(res => res.json()).then(body =>
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#0002c2')
            .setDescription(`📢 __**Bonne seance d ecoute avec Radio A UwU**__\nActuellement entrain d'écouter:\n \`${body.icestats.source.title}\``)
            .setImage(banner)]
      })

      )    
    
  } catch (e) {
    console.log(e);
  }
}

module.exports.name = "ecouter";
module.exports.description = "Ecouter Radio A";
module.exports.defer = false;
module.exports.type = 1;
