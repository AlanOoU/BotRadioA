const { version, MessageEmbed } = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require('os');
let cpuLol;
// cpuStat.usagePercent(function(err, percent, seconds) {

module.exports.run = async (client, message, data) => {
  
  let embed = new MessageEmbed()
  .setColor('#e6f508')
  .addField("❤️ • __Versions__", "NodeJS : " + "`v11.11.0`" + "\n" + "DiscordJS : " + "`" + `v${version}` + "`" + "", true)
  .addField("🚀 • __Système__", "Plateforme : " + "`" +  `${os.platform()}`+ "` \n Arch : " + "`" + `${os.arch()}` + "` \n CPU : " +  "`" + `${os.cpus().map(i => `${i.model}`)[0]}` + "`")
  .addField("💻 • __Processeur__", "RAM: " + "`" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MB`");

  message.channel.send({ embeds: [embed] })


  
}


module.exports.help = {
  name: "info",
  aliases: ["info"],
  category: "Radio",
  desc: "Infos",
  args: false,
  dev: true,
  disabled: false,
  hidden: false,
  usage: "",
  cooldown: 5,
  mPerms: [],
  bPerms: ["SEND_MESSAGES", "EMBED_LINKS"]
}