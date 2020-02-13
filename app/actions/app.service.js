/* eslint-disable promise/always-return */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();

const {
  localNodeAccounts,
  testNodeAccounts,
  testNodeTransactions,
  localNodeGetChainId,
  testNodeGetChainId,
  localNodeCounters,
  testNodeCounters,
  localNodeForgeOperations,
  testNodeForgeOperations,
  localNodePreapplyOperations,
  testNodePreapplyOperations,
  localNodeInjectOperation,
  testNodeInjectOperation
} = process.env;
const axios = require('axios');

const axiosPostConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

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
    payload.env === 'Localnode' ? localNodeGetChainId : testNodeGetChainId;
  axios
    .get(__url)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export function getTransactions(accountId, callback) {
  const __url = testNodeTransactions;
  axios
    .get(`${__url}?p=0&n=10&account=${accountId}`)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export function getChainId(payload, callback) {
  const __url =
    payload.dashboardHeader.networkId === 'Localnode'
      ? localNodeGetChainId
      : testNodeGetChainId;
  axios
    .get(__url)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export function getCounter(payload, callback) {
  const __url =
    payload.dashboardHeader.networkId === 'Localnode'
      ? localNodeCounters
      : testNodeCounters;
  axios
    .get(`${__url}/${payload.senderAccount}/counter`)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export function getManagerKey(payload, callback) {
  const __url =
    payload.dashboardHeader.networkId === 'Localnode'
      ? localNodeCounters
      : testNodeCounters;
  axios
    .get(`${__url}/${payload.senderAccount}/manager_key`)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export function forgeOperations(payload, callback) {
  const __url =
    payload.dashboardHeader.networkId === 'Localnode'
      ? localNodeForgeOperations
      : testNodeForgeOperations;
  axios
    .post(
      `${__url}/${payload.chain_id}/blocks/${payload.hash}/helpers/forge/operations`,
      payload.operationsPayload,
      axiosPostConfig
    )
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export function preApplyOperations(payload, callback) {
  const __url =
    payload.env === 'Localnode'
      ? localNodePreapplyOperations
      : testNodePreapplyOperations;
  axios
    .post(`${__url}`, payload.preApplyOperationPayload, axiosPostConfig)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export function injectOperation(payload, callback) {
  const __url =
    payload.env === 'Localnode'
      ? localNodeInjectOperation
      : testNodeInjectOperation;
  axios
    .get(`${__url}`)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
