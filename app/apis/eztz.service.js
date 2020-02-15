/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const conseiljs = require('conseiljs');
import axios from 'axios';

import { accounts } from './config';
const { localNodeAddress, testNodeAddress, testNodeTransactions } = process.env;

export function __getAccounts({ ...params }, callback) {
  const __url =
    params.dashboardHeader.networkId === 'Localnode'
      ? localNodeAddress
      : testNodeAddress;
  eztz.node.setProvider(__url);
  const totalAccounts = accounts.map(async elem => __getBalance({ ...elem }));
  callback(null, totalAccounts);
}

export async function __activateAccount({ ...params }, callback) {
  const cred = params.email + params.password;
  const keys = await eztz.crypto.generateKeys(params.mnemonic, cred);
  const account = keys.pkh;
  callback(null, account);
}

export async function __getBlockHeads({ ...params }, callback) {
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
  return new Promise((resolve, reject) => {
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
  var operation = {
    kind: 'transaction',
    amount: params.amount,
    destination: params.recieverAccount
  };
  eztz.rpc
    .sendOperation(params.senderAccount, operation, keys)
    .then(function(res) {
      callback(null, res);
    })
    .catch(function(e) {
      callback(err, null);
    });
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
  debugger;
  const contract = fs
    .readFileSync(params.contractFile[0].path)
    .toString('utf-8');
  const tezosProvider =
    params.dashboardHeader.networkId === 'Localnode'
      ? localNodeAddress
      : testNodeAddress;
  const keysStore = {
    publicKey: params.pk,
    privateKey: params.sk,
    publicKeyHash: params.pkh,
    seed: '',
    storeType: conseiljs.StoreType.Fundraiser
  };
  const result = await conseiljs.TezosNodeWriter.sendContractOriginationOperation(
    tezosProvider,
    keysStore,
    0,
    undefined,
    100000,
    '',
    1000,
    100000,
    contract,
    params.initValue,
    conseiljs.TezosParameterFormat.Michelson
  );
}
