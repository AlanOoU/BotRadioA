const Discord = require('discord.js'),
    client = new Discord.Client(),
    config = require('./config.json')
    fs = require('fs')
    const fetch = require('node-fetch')
client.login(config.token)
client.commands = new Discord.Collection()

 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)
})

var myVar = setInterval(act, 2000);

function act() {
    fetch('https://manager6.streamradio.fr:2320/status-json.xsl?mount=/stream').then(res => res.json()).then(body =>
    client.user.setActivity((body.icestats.source.title), {type: 'LISTENING'}));
  }



  
client.once('ready', () => {
        act()
    })

console.log(`Est en ligne !`);
console.log('Commands = .join / .leave / .info')
