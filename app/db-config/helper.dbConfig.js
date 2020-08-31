const INITIAL_DB_CONFIG = require('./tezster.config');
const ip = require('docker-ip');

module.exports = {
  GetDbConfig() {
    let DB_CONFIG = localStorage.getItem('db-config');
    if (DB_CONFIG) {
      DB_CONFIG = JSON.parse(DB_CONFIG);
      if (process.platform.includes('win')) {
        const provider = `http://${ip()}:18732`;
        DB_CONFIG.provider = provider;
        DB_CONFIG.apiEndPoints.Localnode = provider;
        DB_CONFIG.TzStatsApiEndpoint.Localnode = provider;
      }
      return DB_CONFIG;
    }
    return INITIAL_DB_CONFIG;
  },
  GetLocalStorage() {
    let DB_CONFIG = localStorage.getItem(INITIAL_DB_CONFIG.storageName);
    if (DB_CONFIG) {
      DB_CONFIG = JSON.parse(DB_CONFIG);
      if (process.platform.includes('win')) {
        const provider = `http://${ip()}:18732`;
        DB_CONFIG.provider = provider;
        DB_CONFIG.apiEndPoints.Localnode = provider;
        DB_CONFIG.TzStatsApiEndpoint.Localnode = provider;
      }
      return DB_CONFIG;
    }
    return INITIAL_DB_CONFIG;
  },
};
