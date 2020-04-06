/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
// import axios from 'axios';

import { identities, apiEndPoints, ConceilJS } from './config';

const conseiljs = require('conseiljs');
require('dotenv').config();

export async function __getAccounts({ ...params }, callback) {
  const __url = apiEndPoints[params.dashboardHeader.networkId];
  eztz.node.setProvider(__url);
  const totalAccounts = await identities.map(async elem =>
    __getBalance({ ...elem, ...params })
  );
  callback(null, totalAccounts);
}

export async function __activateAccount({ ...params }, callback) {
  const __url = apiEndPoints[params.dashboardHeader.networkId];
  eztz.node.setProvider(__url);
  const cred = params.email + params.password;
  const keys = await eztz.crypto.generateKeys(params.mnemonic, cred);
  callback(null, keys);
}

export async function __getBlockHeads({ ...params }, callback) {
  const __url = apiEndPoints[params.dashboardHeader.networkId];
  eztz.node.setProvider(__url);
  eztz.rpc
    .getHead()
    .then(res => {
      return callback(null, res);
    })
    .catch(err => {
      callback(err, null);
    });
}

export async function __getBalance({ ...params }) {
  const __url = apiEndPoints[params.dashboardHeader.networkId];
  return new Promise((resolve, reject) => {
    eztz.node.setProvider(__url);
    eztz.rpc
      .getBalance(params.pkh)
      .then((res: number) => {
        const balance = (res / 1000000).toFixed(3);
        return resolve({
          balance,
          ...params,
          account: params.pkh
        });
      })
      .catch(exp => {
        reject(exp);
      });
  });
}
export async function __generateMnemonic() {
  const mnemonics = await eztz.crypto.generateMnemonic();
  return mnemonics;
}
export async function __sendOperation({ ...params }, callback) {
  const keys = params.userAccounts.find(
    elem => elem.pkh === params.senderAccount
  );
  const tezosNode = apiEndPoints[params.dashboardHeader.networkId];
  const keystore = {
    publicKey: keys.pk,
    privateKey: keys.sk,
    publicKeyHash: keys.pkh,
    seed: '',
    storeType: conseiljs.StoreType.Fundraiser
  };

  const result = await conseiljs.TezosNodeWriter.sendTransactionOperation(
    tezosNode,
    keystore,
    params.recieverAccount,
    params.amount,
    params.gasPrice,
    ''
  );
  callback(null, result.operationGroupID);
}

export async function __listAccountTransactions({ ...params }, callback) {
  try {
    const platform = 'tezos';
    const network = params.dashboardHeader.networkId.toLowerCase();
    const entity = 'operations';
    const conseilServer = {
      url: ConceilJS.url,
      apiKey: ConceilJS.apiKey,
      network
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
    callback(null, transactions);
  } catch (exp) {
    callback(exp, null);
  }
}

export async function __deployContract({ ...params }, callback) {
  try {
    const tezosNode = 'https://tezos-dev.cryptonomic-infra.tech';
    const network = params.dashboardHeader.networkId.toLowerCase();
    const conseilServer = {
      url: ConceilJS.url,
      apiKey: ConceilJS.apiKey,
      network
    };
    const { contract } = params;
    // const keys = params.userAccounts.find(elem => elem.pkh === params.accounts);
    const keystore = {
      publicKey: 'edpkv4h6yyAPZpve8jQyDiQCAZMHNt6Q796o6eHZxvPEyBiCui4ehv',
      privateKey:
        'edskS6kYsCqdbnMTrV9GYDv562KSCCB17TfukonGG9py3PHPtxxgij31ETbjcfSoKLzQLf1NYKDEkECNNQnv7iugWXbd7p8rc6',
      publicKeyHash: 'tz1ckEA7Ebqg2hNsRJgsyoMDcCsRS2mbkPzp',
      seed: '',
      storeType: conseiljs.StoreType.Fundraiser
    };
    const storage = `${params.storageValue}`;
    const nodeResult = await conseiljs.TezosNodeWriter.sendContractOriginationOperation(
      tezosNode,
      keystore,
      0,
      undefined,
      100000,
      '',
      1000,
      100000,
      contract,
      storage,
      conseiljs.TezosParameterFormat.Michelson
    );

    const groupid = nodeResult.operationGroupID
      .replace(/\"/g, '')
      .replace(/\n/, ''); // clean up RPC output
    const conseilResult = await conseiljs.TezosConseilClient.awaitOperationConfirmation(
      conseilServer,
      'carthagenet',
      groupid,
      5
    );
    callback(null, conseilResult[0].originated_contracts);
  } catch (exp) {
    callback(exp, null);
  }
}
