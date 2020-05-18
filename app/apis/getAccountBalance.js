const request = require('request');

class RpcRequest {
  static fetchBalance(provider, accountHash) {
    return new Promise((resolve, reject) => {
      const URL = `${provider}/chains/main/blocks/head/context/contracts/${accountHash}/balance`;
      request(URL, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          try {
            const balance = JSON.parse(body);
            resolve(balance);
          } catch (exp) {
            reject(exp);
          }
        }
      });
    });
  }

  static checkNodeStatus(provider) {
    return new Promise((resolve, reject) => {
      request(
        `${provider}/chains/main/blocks/head/protocols`,
        (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            try {
              const statusData = JSON.parse(body);
              resolve(statusData);
            } catch (exp) {
              reject(exp);
            }
          }
        }
      );
    });
  }
}

module.exports = { RpcRequest };
