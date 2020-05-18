/* eslint-disable promise/always-return */
/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
// import axios from 'axios';

import { apiEndPoints, ConceilJS } from './config';
import { RpcRequest } from './getAccountBalance';

const conseiljs = require('conseiljs');

require('dotenv').config();

export async function __getAccounts({ ...params }, callback) {
  const __url = apiEndPoints[params.dashboardHeader.networkId];
  eztz.node.setProvider(__url);
  const totalAccounts = await params.userAccounts[
    params.dashboardHeader.networkId.split('-')[0]
  ].map(async (elem) => __getBalance({ ...elem, ...params }));
  return callback(null, totalAccounts);
}
export async function __activateAccount({ ...params }, callback) {
  const __url = apiEndPoints[params.dashboardHeader.networkId];
  eztz.node.setProvider(__url);
  const cred = params.email + params.password;
  const keys = await eztz.crypto.generateKeys(params.mnemonic, cred);
  return callback(null, keys);
}
export async function __activateAccountOperation({ ...params }, callback) {
  try {
    const network = params.dashboardHeader.networkId
      .split('-')[0]
      .toLowerCase();
    const conseilServer = {
      url: ConceilJS.url,
      apiKey: ConceilJS.apiKey,
      network,
    };
    const tezosNode = apiEndPoints[params.dashboardHeader.networkId];
    const faucet = await conseiljs.TezosWalletUtil.unlockFundraiserIdentity(
      params.faucet.mnemonic,
      params.faucet.email,
      params.faucet.password,
      params.faucet.pkh
    );
    const keystore = {
      publicKey: faucet.publicKey,
      privateKey: faucet.privateKey,
      publicKeyHash: params.faucet.pkh,
      seed: '',
      storeType: conseiljs.StoreType.Fundraiser,
    };
    const activationResult = await conseiljs.TezosNodeWriter.sendIdentityActivationOperation(
      tezosNode,
      keystore,
      params.faucet.secret
    );
    if (
      JSON.parse(activationResult.operationGroupID)[0].id &&
      JSON.parse(activationResult.operationGroupID)[0].id === 'failure'
    ) {
      return callback(
        JSON.parse(activationResult.operationGroupID)[0].msg,
        null
      );
    }
    await conseiljs.TezosConseilClient.awaitOperationConfirmation(
      conseilServer,
      network,
      JSON.parse(activationResult.operationGroupID),
      10,
      30 + 1
    );
    const revelationResult = await conseiljs.TezosNodeWriter.sendKeyRevealOperation(
      tezosNode,
      keystore
    );
    return callback(null, {
      ...activationResult,
      ...faucet,
      operationGroupID: revelationResult.operationGroupID,
    });
  } catch (exp) {
    return callback(exp, null);
  }
}
export async function __getBalance({ ...params }) {
  const __url = apiEndPoints[params.dashboardHeader.networkId];
  return new Promise((resolve, reject) => {
    RpcRequest.fetchBalance(__url, params.pkh)
      .then((res) => {
        const balance = (parseInt(res, 10) / 1000000).toFixed(3);
        return resolve({
          balance,
          sk: params.sk,
          pk: params.pk,
          pkh: params.pkh,
          label: params.label,
          account: params.pkh,
          publicKey: params.pk,
        });
      })
      .catch((exp) => {
        reject(exp);
      });
  });
}
export async function __getStorage({ ...params }, callback) {
  const __url = apiEndPoints[params.dashboardHeader.networkId];
  eztz.node.setProvider(__url);
  eztz.contract
    .storage(params.selectedContracts)
    .then((storage) => {
      return callback(null, storage);
    })
    .catch((exp) => {
      return callback(exp, null);
    });
}
export async function __generateMnemonic() {
  const mnemonics = await eztz.crypto.generateMnemonic();
  return mnemonics;
}
export async function __sendOperation({ ...params }, callback) {
  const keys = params.userAccounts.find(
    (elem) => elem.pkh === params.senderAccount
  );
  const tezosNode = apiEndPoints[params.dashboardHeader.networkId];
  const keystore = {
    publicKey: keys.pk,
    privateKey: keys.sk,
    publicKeyHash: keys.pkh,
    seed: '',
    storeType: conseiljs.StoreType.Fundraiser,
  };
  const result = await conseiljs.TezosNodeWriter.sendTransactionOperation(
    tezosNode,
    keystore,
    params.recieverAccount,
    parseInt(params.amount, 10) * 1000000,
    params.gasPrice,
    ''
  );
  if (
    JSON.parse(result.operationGroupID)[0].id &&
    JSON.parse(result.operationGroupID)[0].id === 'failure'
  ) {
    return callback(JSON.parse(result.operationGroupID)[0].msg, null);
  }
  return callback(null, result.operationGroupID);
}
export async function __listAccountTransactions({ ...params }, callback) {
  try {
    const platform = 'tezos';
    const network = params.dashboardHeader.networkId
      .split('-')[0]
      .toLowerCase();
    const entity = 'operations';
    const conseilServer = {
      url: ConceilJS.url,
      apiKey: ConceilJS.apiKey,
      network,
    };
    let sendQuery = conseiljs.ConseilQueryBuilder.blankQuery();
    sendQuery = conseiljs.ConseilQueryBuilder.addFields(
      sendQuery,
      'block_level',
      'timestamp',
      'source',
      'destination',
      'amount',
      'fee',
      'counter'
    );
    sendQuery = conseiljs.ConseilQueryBuilder.addPredicate(
      sendQuery,
      'kind',
      conseiljs.ConseilOperator.EQ,
      ['transaction'],
      false
    );
    sendQuery = conseiljs.ConseilQueryBuilder.addPredicate(
      sendQuery,
      'source',
      conseiljs.ConseilOperator.EQ,
      [params.accountId],
      false
    );
    sendQuery = conseiljs.ConseilQueryBuilder.addPredicate(
      sendQuery,
      'status',
      conseiljs.ConseilOperator.EQ,
      ['applied'],
      false
    );
    sendQuery = conseiljs.ConseilQueryBuilder.addOrdering(
      sendQuery,
      'block_level',
      conseiljs.ConseilSortDirection.DESC
    );
    sendQuery = conseiljs.ConseilQueryBuilder.setLimit(sendQuery, 100);

    let receiveQuery = conseiljs.ConseilQueryBuilder.blankQuery();
    receiveQuery = conseiljs.ConseilQueryBuilder.addFields(
      receiveQuery,
      'block_level',
      'timestamp',
      'source',
      'destination',
      'amount',
      'fee',
      'counter'
    );
    receiveQuery = conseiljs.ConseilQueryBuilder.addPredicate(
      receiveQuery,
      'kind',
      conseiljs.ConseilOperator.EQ,
      ['transaction'],
      false
    );
    receiveQuery = conseiljs.ConseilQueryBuilder.addPredicate(
      receiveQuery,
      'destination',
      conseiljs.ConseilOperator.EQ,
      [params.accountId],
      false
    );
    receiveQuery = conseiljs.ConseilQueryBuilder.addPredicate(
      receiveQuery,
      'status',
      conseiljs.ConseilOperator.EQ,
      ['applied'],
      false
    );
    receiveQuery = conseiljs.ConseilQueryBuilder.addOrdering(
      receiveQuery,
      'block_level',
      conseiljs.ConseilSortDirection.DESC
    );
    receiveQuery = conseiljs.ConseilQueryBuilder.setLimit(receiveQuery, 100);

    const sendResult = await conseiljs.ConseilDataClient.executeEntityQuery(
      conseilServer,
      platform,
      network,
      entity,
      sendQuery
    );
    const receiveResult = await conseiljs.ConseilDataClient.executeEntityQuery(
      conseilServer,
      platform,
      network,
      entity,
      receiveQuery
    );
    const transactions = sendResult.concat(receiveResult).sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    return callback(null, transactions);
  } catch (exp) {
    return callback(exp, null);
  }
}
export async function __deployContract({ ...params }, callback) {
  try {
    const network = params.dashboardHeader.networkId
      .split('-')[0]
      .toLowerCase();
    const conseilServer = {
      url: ConceilJS.url,
      apiKey: ConceilJS.apiKey,
      network,
    };
    const tezosNode = apiEndPoints[params.dashboardHeader.networkId];
    const { contract } = params;
    const keys = params.userAccounts.find(
      (elem) => elem.pkh === params.accounts
    );
    const keystore = {
      publicKey: keys.pk,
      privateKey: keys.sk,
      publicKeyHash: keys.pkh,
      seed: '',
      storeType: conseiljs.StoreType.Fundraiser,
    };
    const storage = `${params.storageValue}`;
    conseiljs.TezosNodeWriter.sendContractOriginationOperation(
      tezosNode,
      keystore,
      parseInt(params.contractAmount, 10),
      undefined,
      100000,
      '',
      10000,
      100000,
      contract,
      storage,
      conseiljs.TezosParameterFormat.Michelson
    )
      .then(async (nodeResult) => {
        if (
          nodeResult.results.contents[0].metadata.operation_result.status ===
          'applied'
        ) {
          const __localStorage__ = JSON.parse(localStorage.getItem('tezsure'));
          __localStorage__.contracts[
            params.dashboardHeader.networkId.split('-')[0]
          ].push({
            name: params.contractLabel,
            originated_contracts:
              nodeResult.results.contents[0].metadata.operation_result
                .originated_contracts[0],
            contract,
          });
          localStorage.setItem(
            'tezsure',
            JSON.stringify({ ...__localStorage__ })
          );
          if (network !== 'localnode') {
            await conseiljs.TezosConseilClient.awaitOperationConfirmation(
              conseilServer,
              network,
              JSON.parse(nodeResult.operationGroupID),
              10,
              10
            );
          }
          return callback(
            null,
            nodeResult.results.contents[0].metadata.operation_result
              .originated_contracts[0]
          );
        }
        return callback('Contract not deployed', null);
      })
      .catch((exp) => {
        return callback(exp, null);
      });
  } catch (exp) {
    return callback(exp, null);
  }
}
export async function __invokeContract({ ...params }, callback) {
  try {
    const network = params.dashboardHeader.networkId
      .split('-')[0]
      .toLowerCase();
    const conseilServer = {
      url: ConceilJS.url,
      apiKey: ConceilJS.apiKey,
      network,
    };
    const tezosNode = apiEndPoints[params.dashboardHeader.networkId];
    const keys = params.userAccounts.find(
      (elem) => elem.pkh === params.accounts
    );
    const keystore = {
      publicKey: keys.pk,
      privateKey: keys.sk,
      publicKeyHash: keys.pkh,
      seed: '',
      storeType: conseiljs.StoreType.Fundraiser,
    };
    const contractAddress = params.selectedContracts;
    const storage = `${params.storageValue}`;
    conseiljs.TezosNodeWriter.sendContractInvocationOperation(
      tezosNode,
      keystore,
      contractAddress,
      parseInt(params.contractAmount, 10),
      100000,
      '',
      1000,
      100000,
      undefined,
      storage,
      conseiljs.TezosParameterFormat.Michelson
    )
      .then(async (nodeResult) => {
        if (
          nodeResult.results.contents[0].metadata.operation_result.status ===
          'applied'
        ) {
          if (network !== 'localnode') {
            await conseiljs.TezosConseilClient.awaitOperationConfirmation(
              conseilServer,
              network,
              JSON.parse(nodeResult.operationGroupID),
              10,
              30 + 1
            );
          }
          return callback(null, nodeResult.operationGroupID.replace(/\"/g, ''));
        }
        return callback('Contract invocation failed', null);
      })
      .catch((exp) => {
        return callback(exp, null);
      });
  } catch (exp) {
    return callback(exp, null);
  }
}
