const { Collection } = require('discord.js');
const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const client = require('../main');

loadCmds = async (nodebug = false) => {
  // Commands
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    try {
      let file = require(value);
      let splitted = value.split("/");
      let directory = splitted[splitted.length - 2];

      if (file.help.name) {
        client.commands.set(file.help.name, file);
        if (!nodebug) {
          console.log(
            `Loading Command ${file.help.name}`
          );
        }
      }
    } catch (error) {
      console.log(
        `Command: ${value}: ${error}`
      );
    }
  })
}
loadCmds();

client.on("messageCreate", (message, data) => {

  if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return console.log(`❌ Permissions inssufisantes ! (${guild.name})`);
  data = {};
  data.prefix = client.config.prefix;

  if (!message.content.startsWith(`<@!${client.user.id}>`) && !message.content.startsWith(data.prefix)) return;

  data.args = message.content.slice(message.content.startsWith(`<@!${client.user.id}> `) ? `<@!${client.user.id}> `.length : message.content.startsWith(`<@!${client.user.id}>`) ? `<@!${client.user.id}>`.length : data.prefix.length).split(/ +/);

  const commandNme = data.args.shift().toLowerCase();
  let commandName = accentsTidy(commandNme);
  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  data.command = command;
  //Verifs Commands
  if (!command) return;
 
  if (!client.cooldowns.has(command.help.name)) client.cooldowns.set(command.help.name, new Collection());
  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.channel.send({ content: `:x: Please wait ${timeLeft.toFixed(0)} second(s) before re-using command \`${command.help.name}\` !`, components: [docsBtn] }).then((msg) => { setTimeout(() => msg.delete(), timeLeft.toFixed(0) * 1000); }).catch(console.error);
    }
  }
  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);
  // ******************** Système de Cooldown ********************


  // ******************** Execution de la commande ********************
  console.log(`(${message.guild.name}) User ${message.author.tag} run the command : ${command.help.name} ${data.args} !`);
  try {
    command.run(client, message, data);
  } catch (error) {
    console.log(`❌ An error occurred during the execution of the command ${command.help.name} !`);
    console.log(error);
  }

})