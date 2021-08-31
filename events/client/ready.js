let fetch = require('node-fetch');

module.exports = async (client) => {
  console.log(
    `${client.user.tag} Connected (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users) !`
  );

  
  let refreshStatus = () => {
    fetch('https://manager6.streamradio.fr:2320/status-json.xsl?mount=/stream').then(res => res.json()).then(body =>
    client.user.setActivity((body.icestats.source.title), { type: 'LISTENING' }));
  };
  refreshStatus();
  setInterval(refreshStatus, 2000);
  
}