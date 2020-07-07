const request = require('request');

class RpcRequest {
  static fetchBalance(accountHash) {
    return new Promise((resolve, reject) => {
      const URL = `https://api.carthagenet.tzstats.com/explorer/account/${accountHash}`;
      request(URL, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          try {
            const balance = JSON.parse(body).total_balance;
            resolve(balance);
          } catch (exp) {
            reject(exp);
          }
        }
      });
    });
  }
}

module.exports = { RpcRequest };
