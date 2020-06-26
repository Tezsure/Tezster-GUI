import {
  apiEndPoints,
  ConceilJS,
  storageName,
} from '../../../db-config/tezster.config';

const conseiljs = require('conseiljs');

const LOCAL_STORAGE_NAME = storageName;

export async function DeployContractAPI(args, callback) {
  try {
    const network = args.dashboardHeader.networkId.split('-')[0].toLowerCase();
    const conseilServer = {
      url: ConceilJS.url,
      apiKey: ConceilJS.apiKey,
      network,
    };
    const tezosNode = apiEndPoints[args.dashboardHeader.networkId];
    const { contract } = args;
    const keys = args.userAccounts.find((elem) => elem.pkh === args.accounts);
    const keystore = {
      publicKey: keys.pk,
      privateKey: keys.sk,
      publicKeyHash: keys.pkh,
      seed: '',
      storeType: conseiljs.StoreType.Fundraiser,
    };
    const storage = `${args.storageValue}`;
    conseiljs.TezosNodeWriter.sendContractOriginationOperation(
      tezosNode,
      keystore,
      parseInt(args.contractAmount, 10),
      undefined,
      100000,
      '',
      10000,
      500000,
      contract,
      storage,
      conseiljs.TezosParameterFormat.Michelson
    )
      .then(async (nodeResult) => {
        if (
          nodeResult.results.contents[0].metadata.operation_result.status ===
          'applied'
        ) {
          const LocalStorage = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_NAME)
          );
          LocalStorage.contracts[
            args.dashboardHeader.networkId.split('-')[0]
          ].push({
            name: args.contractLabel,
            originated_contracts:
              nodeResult.results.contents[0].metadata.operation_result
                .originated_contracts[0],
            contract,
          });
          localStorage.setItem(
            LOCAL_STORAGE_NAME,
            JSON.stringify({ ...LocalStorage })
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
export async function InvokeContractAPI(args, callback) {
  try {
    const network = args.dashboardHeader.networkId.split('-')[0].toLowerCase();
    const conseilServer = {
      url: ConceilJS.url,
      apiKey: ConceilJS.apiKey,
      network,
    };
    const tezosNode = apiEndPoints[args.dashboardHeader.networkId];
    const keys = args.userAccounts.find((elem) => elem.pkh === args.accounts);
    const keystore = {
      publicKey: keys.pk,
      privateKey: keys.sk,
      publicKeyHash: keys.pkh,
      seed: '',
      storeType: conseiljs.StoreType.Fundraiser,
    };
    const contractAddress = args.selectedContracts;
    const storage = `${args.storageValue}`;
    conseiljs.TezosNodeWriter.sendContractInvocationOperation(
      tezosNode,
      keystore,
      contractAddress,
      parseInt(args.contractAmount, 10),
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
          return callback(
            null,
            nodeResult.operationGroupID.replace(/\\"/g, '')
          );
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
export async function GetStorageAPI(args, callback) {
  try {
    const tezosNode = apiEndPoints[args.dashboardHeader.networkId];
    const contract = args.selectedContracts;
    const storage = await conseiljs.TezosNodeReader.getContractStorage(
      tezosNode,
      contract
    );
    callback(null, storage);
  } catch (error) {
    callback(error, null);
  }
}
