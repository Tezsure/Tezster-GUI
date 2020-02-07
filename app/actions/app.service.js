/* eslint-disable promise/always-return */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();

const {
  localNodeAccounts,
  testNodeAccounts,
  testNodeTransactions,
  localNodeGetBlockHeads,
  testNodeGetBlockHeads
} = process.env;
const axios = require('axios');

export function getContracts(env, callback) {
  // const __url = env === 'Localnode' ? localNodeAccounts : testNodeAccounts;
  axios
    .get(localNodeAccounts)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export function getBalance(payload, callback) {
  const __url =
    payload.env === 'Localnode'
      ? `${localNodeAccounts}/${payload.contracts}/balance`
      : `${testNodeAccounts}/${payload.contracts}/balance`;

  axios
    .get(__url)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export function getBlockHeads(payload, callback) {
  const __url =
    payload.env === 'Localnode'
      ? localNodeGetBlockHeads
      : testNodeGetBlockHeads;
  axios
    .get(__url)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export function getTransactions(payload, callback) {
  const __url = testNodeTransactions;
  axios()
    .get(__url)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
