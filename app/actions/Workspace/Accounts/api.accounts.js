import { RpcRequest } from './helper.accounts';
import { apiEndPoints, ConceilJS } from '../../../db-config/tezster.config';

const conseiljs = require('conseiljs');

export async function GetAccountsAPI(args, callback) {
  try {
    const { networkId } = args.dashboardHeader;
    const networkName = networkId.split('-')[0];

    const { userAccounts } = args;
    const accounts = await userAccounts[networkName].map((elem) =>
      GetBalanceAPI({ ...args, ...elem })
    );

    return callback(null, accounts);
  } catch (exp) {
    return callback(exp, null);
  }
}

export async function GetBalanceAPI(args) {
  try {
    const { networkId } = args.dashboardHeader;
    const URL = apiEndPoints[networkId];

    const response = await RpcRequest.fetchBalance(URL, args.pkh);
    const balance = (parseInt(response, 10) / 1000000).toFixed(3);

    const result = {
      balance,
      sk: args.sk,
      pk: args.pk,
      pkh: args.pkh,
      label: args.label,
      account: args.pkh,
      publicKey: args.pk,
    };
    return result;
  } catch (exp) {
    return exp;
  }
}

export async function ActivateAccountsAPI(args, callback) {
  try {
    const { networkId } = args.dashboardHeader;
    const networkName = networkId.split('-')[0];
    const network = networkName.toLowerCase();

    const conseilServer = {
      url: ConceilJS.url,
      apiKey: ConceilJS.apiKey,
      network,
    };

    const tezosNode = apiEndPoints[args.dashboardHeader.networkId];
    const faucet = await conseiljs.TezosWalletUtil.unlockFundraiserIdentity(
      args.faucet.mnemonic,
      args.faucet.email,
      args.faucet.password,
      args.faucet.pkh
    );
    const keystore = {
      publicKey: faucet.publicKey,
      privateKey: faucet.privateKey,
      publicKeyHash: args.faucet.pkh,
      seed: '',
      storeType: conseiljs.StoreType.Fundraiser,
    };
    const activationResult = await conseiljs.TezosNodeWriter.sendIdentityActivationOperation(
      tezosNode,
      keystore,
      args.faucet.secret
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
      10
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

export async function CreateFundraiserAccountAPI(args, callback) {
  const keystore = await conseiljs.TezosWalletUtil.unlockIdentityWithMnemonic(
    args.mnemonic,
    args.password || ''
  );
  return callback(null, keystore);
}
