const { glob } = require('glob');
const { promisify } = require('util');
const client = require('../main');
const globPromise = promisify(glob);
var fs = require('fs');

loadCmds = async (nodebug = false) => {
  // Slash Commands 
  const interactCommands = await globPromise(`${process.cwd()}/interactCommands/**/*.js`);
  let arrayOfinteractCommands = [];

  interactCommands.map((value) => {
    try {
      const file = require(value);
      if(!file?.name) return;

      client.interactCommands.set(file.name, file);
      arrayOfinteractCommands.push(file);
      if(!nodebug){
        console.log(
          `Chargement de la commande slash ${file.name}`,
          "log"
        );
      }
    } catch (error) {
      console.log(
        `Commande slash: ${value}: ${error}`,
        "error"
      );
    }
    
  })

  client.on("ready", async () => {
    await client.guilds.cache.get("872612194200731729").commands.set(arrayOfinteractCommands);
  })
}
loadCmds();

client.on("interactionCreate", (interaction) => {
  if (interaction.isCommand() || interaction.isContextMenu()) {
    const cmd = client.interactCommands.get(interaction.commandName);
    if (!cmd) return false;
    
    const args = [];
    if(!interaction.targetType  && interaction.targetType != "MESSAGE"){
      if(interaction.options._hoistedOptions){
        interaction.options._hoistedOptions.map((x) => {
          if(x.value) args.push(x.value);
          if(x.name) args.push(x.name);
        })
      }else {
        interaction.options.array().map((x) => {
          if(x.value) args.push(x);
          if(x.name) args.push(x.name);
        })
      }
    }
    console.log(`(${interaction.guild.name}) User ${interaction.user.tag} run the slash command : ${interaction.commandName} ${args} !`);


    try {
      cmd.run(client, interaction, args)
    } catch (error) {
      console.log(`❌ An error occurred during the execution of the command ${interaction.commandName} !`);
      console.log(error);
    }
  }
})