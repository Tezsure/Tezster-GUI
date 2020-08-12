const INITIAL_DB_CONFIG = require('./tezster.config');

module.exports = {
  GetDbConfig() {
    const DB_CONFIG = localStorage.getItem('db-config');
    if (DB_CONFIG) {
      return JSON.parse(DB_CONFIG);
    }
    return INITIAL_DB_CONFIG;
  },
  GetLocalStorage() {
    const DB_CONFIG = localStorage.getItem(INITIAL_DB_CONFIG.storageName);
    if (DB_CONFIG) {
      return JSON.parse(DB_CONFIG);
    }
    return INITIAL_DB_CONFIG;
  },
};
