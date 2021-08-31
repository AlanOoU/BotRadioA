const { glob } = require('glob');
const { promisify } = require('util');

const globPromise = promisify(glob);

module.exports = async(client, nodebug = false) => {

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
  eventFiles.map(async (value) => {
    try {
      const evt = require(value);
      let l = value.split("/");
      const evtName = l[l.length - 1].split(".js")[0];
      if(!nodebug){
        console.log(
          `Loading Event ${evtName}`
        );
      }
      client.on(evtName, evt.bind(null, client));
      
    } catch (error) {
      console.log(
        `Event: ${value}: ${error}`
      );
    }
  })

  // Plugins
  const pluginsFiles = await globPromise(`${process.cwd()}/plugins/*.js`);
  pluginsFiles.map(async (value) => {
    try {
      const pl = require(value);
      let l = value.split("/");
      const plName = l[l.length - 1].split(".js")[0];
      if(!nodebug){
        console.log(
          `Loading Plugin ${plName}`
        );
      }
      client.plugins.set(plName, pl);
      // client.plugins.get(plName).run(client);
      
    } catch (error) {
      console.log(
        `Plugin: ${value}: ${error}`
      );
    }
  })

}