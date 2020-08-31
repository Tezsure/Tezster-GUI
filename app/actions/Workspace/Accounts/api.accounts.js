import { RpcRequest } from './helper.accounts';

const conseiljs = require('conseiljs');

const Config = require('../../../db-config/helper.dbConfig');

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
    const URL = Config.GetLocalStorage().apiEndPoints[networkId];

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

    const tezosNode = Config.GetLocalStorage().apiEndPoints[
      args.dashboardHeader.networkId
    ];
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
    if (networkName !== 'Localnode') {
      if (
        JSON.parse(activationResult.operationGroupID)[0].id &&
        JSON.parse(activationResult.operationGroupID)[0].id === 'failure'
      ) {
        return callback(
          JSON.parse(activationResult.operationGroupID)[0].msg,
          null
        );
      }
      const conseilServer = {
        url: Config.GetLocalStorage().ConseilJS[networkName].url,
        apiKey: Config.GetLocalStorage().ConseilJS[networkName].apiKey,
        network,
      };
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
    }
    return callback(null, {
      ...activationResult,
      ...faucet,
    });
  } catch (exp) {
    return callback(exp, null);
  }
}

export async function CreateFundraiserAccountAPI(args, callback) {
  try {
    if (args.mnemonic && args.selectedContractsTab === 'addFaucetAccount') {
      const faucet = await conseiljs.TezosWalletUtil.unlockFundraiserIdentity(
        args.mnemonic,
        args.email,
        args.password,
        args.pkh
      );
      // eslint-disable-next-line no-unused-vars
      const keystore = {
        publicKey: faucet.publicKey,
        privateKey: faucet.privateKey,
        publicKeyHash: args.pkh,
        seed: '',
        storeType: conseiljs.StoreType.Fundraiser,
      };
      keystore.sk = keystore.privateKey;
      keystore.pkh = args.pkh;
      keystore.pk = keystore.publicKey;
      keystore.secretKey = keystore.privateKey;
      return callback(null, keystore);
    }
    if (args.mnemonic) {
      const keystore = await conseiljs.TezosWalletUtil.unlockIdentityWithMnemonic(
        args.mnemonic,
        args.password || ''
      );
      keystore.sk = keystore.privateKey;
      keystore.pkh = args.pkh;
      keystore.pk = keystore.publicKey;
      keystore.secretKey = keystore.privateKey;
      return callback(null, keystore);
    }
    const keystore = await conseiljs.TezosWalletUtil.restoreIdentityWithSecretKey(
      args.privateKey
    );
    keystore.sk = keystore.privateKey;
    keystore.pkh = args.pkh;
    keystore.pk = keystore.publicKey;
    keystore.secretKey = keystore.privateKey;
    return callback(null, keystore);
  } catch (exp) {
    return callback(exp.toString(), null);
  }
}
