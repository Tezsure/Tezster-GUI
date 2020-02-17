/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const conseiljs = require('conseiljs');
import axios from 'axios';
var fs = require('fs');

import { identities } from './config';
const { localNodeAddress, testNodeAddress, testNodeTransactions } = process.env;

export function __getAccounts({ ...params }, callback) {
  const __url =
    params.dashboardHeader.networkId === 'Localnode'
      ? localNodeAddress
      : testNodeAddress;
  eztz.node.setProvider(__url);
  const totalAccounts = identities.map(async elem =>
    __getBalance({ ...elem, ...params })
  );
  callback(null, totalAccounts);
}

export async function __activateAccount({ ...params }, callback) {
  const __url =
    params.dashboardHeader.networkId === 'Localnode'
      ? localNodeAddress
      : testNodeAddress;
  eztz.node.setProvider(__url);
  const cred = params.email + params.password;
  const keys = await eztz.crypto.generateKeys(params.mnemonic, cred);
  callback(null, keys);
}

export async function __getBlockHeads({ ...params }, callback) {
  const __url =
    params.dashboardHeader.networkId === 'Localnode'
      ? localNodeAddress
      : testNodeAddress;
  eztz.node.setProvider(__url);
  eztz.rpc
    .getHead()
    .then(function(res) {
      callback(null, res);
    })
    .catch(function(e) {
      callback(err, null);
    });
}

export async function __getBalance({ ...params }) {
  const __url =
    params.dashboardHeader.networkId === 'Localnode'
      ? localNodeAddress
      : testNodeAddress;
  return new Promise((resolve, reject) => {
    eztz.node.setProvider(__url);
    eztz.rpc
      .getBalance(params.pkh)
      .then((res: number) => {
        const balance = (res / 1000000).toFixed(3);
        resolve({
          balance,
          ...params,
          account: params.pkh
        });
      })
      .catch((e: any) => {
        reject(e);
      });
  });
}
export async function __generateMnemonic() {
  const mnemonics = await eztz.crypto.generateMnemonic();
  return mnemonics;
}
export async function __sendOperation({ ...params }, callback) {
  var keys = params.userAccounts.find(
    elem => elem.pkh === params.senderAccount
  );
  const tezosNode =
    params.dashboardHeader.networkId === 'Localnode'
      ? localNodeAddress
      : testNodeAddress;
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
  const __url = testNodeTransactions;
  axios
    .get(`${__url}?p=0&n=10&account=${params.accountId}`)
    .then(response => {
      callback(null, response.data);
    })
    .catch(exception => {
      callback(exception, null);
    });
}
export async function __deployContract({ ...params }, callback) {
  var keys = params.userAccounts.find(elem => elem.pkh === params.accounts);
  const contract = fs
    .readFileSync(params.contractFile[0].path)
    .toString('utf-8');
  const tezosNode =
    params.dashboardHeader.networkId === 'Localnode'
      ? localNodeAddress
      : testNodeAddress;
  const keystore = {
    publicKey: keys.pk,
    privateKey: keys.sk,
    publicKeyHash: keys.pkh,
    seed: '',
    storeType: conseiljs.StoreType.Fundraiser
  };
  const storage = '{"string": "Sample"}';
  debugger;
  const result = await conseiljs.TezosNodeWriter.sendContractOriginationOperation(
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
    conseiljs.TezosParameterFormat.Micheline
  );
  callback(null, result);
}
