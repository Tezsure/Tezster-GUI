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
    const { networkId } = args.dashboardHeader;
    const networkName = networkId.split('-')[0];
    const network = networkName.toLowerCase();

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
    const transactionResult = await conseiljs.TezosNodeWriter.sendTransactionOperation(
      tezosNode,
      keystore,
      args.recieverAccount,
      parseInt(args.amount, 10) * 1000000,
      parseInt(args.gasPrice, 10),
      ''
    );
    if (networkName !== 'Localnode') {
      const conseilServer = {
        url: Config.GetLocalStorage().ConseilJS[networkName].url,
        apiKey: Config.GetLocalStorage().ConseilJS[networkName].apiKey,
        network,
      };
      if (
        JSON.parse(transactionResult.operationGroupID)[0].id &&
        JSON.parse(transactionResult.operationGroupID)[0].id === 'failure'
      ) {
        return callback(
          JSON.parse(transactionResult.operationGroupID)[0].msg,
          null
        );
      }
      if (args.dashboardHeader.networkId === 'Localnode') {
        return callback(null, {
          operationGroupID: transactionResult.operationGroupID,
        });
      }
      await conseiljs.TezosConseilClient.awaitOperationConfirmation(
        conseilServer,
        network,
        JSON.parse(transactionResult.operationGroupID),
        10,
        10
      );
      return callback(null, {
        operationGroupID: transactionResult.operationGroupID,
      });
    }
    callback(null, {
      operationGroupID: transactionResult.operationGroupID,
    });
  } catch (error) {
    return callback(error.toString(), null);
  }
}
