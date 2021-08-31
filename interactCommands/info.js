const { version, MessageEmbed } = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require('os');
let cpuLol;

module.exports.run = async (client, interaction, args) => {

  try {
  
    let embed = new MessageEmbed()
    .setColor('#e6f508')
    .addField("❤️ • __Versions__", "NodeJS : " + "`v11.11.0`" + "\n" + "DiscordJS : " + "`" + `v${version}` + "`" + "", true)
    .addField("🚀 • __Système__", "Plateforme : " + "`" +  `${os.platform()}`+ "` \n Arch : " + "`" + `${os.arch()}` + "` \n CPU : " +  "`" + `${os.cpus().map(i => `${i.model}`)[0]}` + "`")
    .addField("💻 • __Processeur__", "RAM: " + "`" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MB`");

    interaction.reply({ embeds: [embed] })
  } catch (e) {
    console.log(e);
  }
}

module.exports.name = "info";
module.exports.description = "Informations sur le bot";
module.exports.defer = false;
module.exports.type = 1;
