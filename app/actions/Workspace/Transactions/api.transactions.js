/* eslint-disable prettier/prettier */
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

const conseiljs = require('conseiljs');

const Config = require('../../../db-config/helper.dbConfig');

export async function ListAccountTransactionsAPI(args, callback) {
  try {
    const platform = 'tezos';
    const { networkId } = args.dashboardHeader;
    const networkName = networkId.split('-')[0];
    const network = networkName.toLowerCase();

    const entity = 'operations';
    const conseilServer = {
      url: Config.GetLocalStorage().ConseilJS[networkName].url,
      apiKey: Config.GetLocalStorage().ConseilJS[networkName].apiKey,
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
      [args.accountId],
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
      [args.accountId],
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

export async function TransferBalanceTransactionAPI(args, callback) {
  try {
    const keys = args.userAccounts.find(
      (elem) => elem.pkh === args.senderAccount
    );
    const tezosNode = Config.GetLocalStorage().apiEndPoints[
      args.dashboardHeader.networkId
    ];
    const keystore = {
      publicKey: keys.pk,
      privateKey: keys.sk,
      publicKeyHash: keys.pkh,
      seed: '',
      storeType: conseiljs.StoreType.Fundraiser,
    };
    const rpc = tezosNode;
    const signer = await InMemorySigner.fromSecretKey(keystore.privateKey);
    const Tezos = new TezosToolkit(rpc);
    Tezos.setProvider({ signer });
    const reciever = args.recieverAccount;
    const amount = parseInt(args.amount, 10);
    const transferParams = {
      from: keystore.publicKey,
      to: reciever,
      amount,
    };
    if (args.gasPrice && parseInt(args.gasPrice, 10) !== 0) {
      transferParams.fee = parseInt(args.gasPrice, 10);
    }
    const operation = await Tezos.contract.transfer(transferParams);
    callback(null, {
      fee: operation.params.fee,
      transaction: operation.hash,
    });
  } catch (error) {
    return callback(error.toString(), null);
  }
}
