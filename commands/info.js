const Discord = require("discord.js");


module.exports = {
    run: async (message, client) => {
      	 const { version } = require("discord.js");
    	let cpuStat = require("cpu-stat");
    	let os = require('os');
   	 let cpuLol;
   	 cpuStat.usagePercent(function(err, percent, seconds) {
    	if (err) {
        return console.log(err);
    }
})

        message.channel.send(new Discord.MessageEmbed()
        .setColor('#e6f508')
	    .addField("❤️ • __Versions__", "NodeJS : " + "`v11.11.0`" + "\n" + "DiscordJS : " + "`" + `v${version}` + "`" + "", true)
        .addField("🚀 • __Système__", "Plateforme : " + "`" +  `${os.platform()}`+ "` \n Arch : " + "`" + `${os.arch()}` + "` \n CPU : " +  "`" + `${os.cpus().map(i => `${i.model}`)[0]}` + "`")
        .addField("💻 • __Processeur__", "RAM: " + "`" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MB`")
        

        )
      },

    name: 'info',
    guildOnly: false
}
