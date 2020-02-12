const {
  getTransactions,
  getBalance,
  getChainId,
  getCounter,
  getManagerKey,
  forgeOperations,
  preApplyOperations,
  injectOperation
} = require('../app.service.js');

export function selectWalletAction(payload) {
  return dispatch => {
    dispatch({
      type: 'SELECT_TRANSACTION_ACCOUNT',
      payload: payload.accountId
    });
    dispatch(getTransactionsAction(payload));
  };
}

export function getTransactionsAction(payload) {
  return dispatch => {
    if (payload.dashboardHeader.networkId === 'Localnode') {
      const { transactions } = JSON.parse(localStorage.getItem('reduxState'));
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: transactions
      });
    }

    getTransactions(payload.accountId, (err, response) => {
      if (err) {
        dispatch({
          type: 'GET_TRANSACTIONS_ERR',
          payload: err
        });
      }
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: response
      });
    });
  };
}
export function getBalanceAction(payload) {
  return dispatch => {
    getBalance(payload.dashboardHeader.networkId, (err, response) => {
      if (err) {
        dispatch({
          type: 'GET_BALANCE_ERR',
          payload: err
        });
      }
      dispatch({
        type: 'GET_BALANCE',
        payload: response
      });
    });
  };
}
export function executeTransactionAction(payload) {
  return dispatch => {
    getChainId(payload, (chainIdErr, chainIds) => {
      getCounter(payload, (counterErr, counter) => {
        getManagerKey(
          { ...payload, ...chainIds },
          (managerKeyErr, managerKey) => {
            const operationsPayload = {
              branch: chainIds.hash,
              contents: [
                {
                  kind: 'transaction',
                  fee: '1400',
                  gas_limit: '20200',
                  storage_limit: '300',
                  amount: '1000000000',
                  destination: payload.recieverAccount,
                  source: payload.senderAccount,
                  counter
                }
              ]
            };
            forgeOperations(
              {
                ...payload,
                ...managerKey,
                ...chainIds,
                operationsPayload
              },
              (operationsErr, operationsHash) => {
                operationsPayload.protocol = chainIds.protocol;
                operationsPayload.signature = chainIds.signature;
                const preApplyOperationPayload = [];
                preApplyOperationPayload.push(operationsPayload);
                preApplyOperations(
                  { ...payload, preApplyOperationPayload },
                  (err, response) => {
                    dispatch({
                      type: 'EXECUTE_TRANSACTIONS_SUCCESS',
                      payload: response
                    });
                  }
                );
              }
            );
          }
        );
      });
    });
  };
}
export function getChainIdAction(payload) {
  return dispatch => {
    getChainId(payload, (err, response) => {
      if (err) {
        dispatch({
          type: 'GET_CHAIN_ID_ERR',
          payload: err
        });
      }
      dispatch({
        type: 'GET_CHAIN_ID',
        payload: response
      });
    });
  };
}
export function getManagerKeyAction(payload) {
  return dispatch => {
    getManagerKey(payload, (err, response) => {
      if (err) {
        dispatch({
          type: 'GET_MANAGER_KEY_ERR',
          payload: err
        });
      }
      dispatch({
        type: 'GET_MANAGER_KEY',
        payload: response
      });
    });
  };
}
export function forgeOperationAction(payload) {
  return dispatch => {
    forgeOperations(payload, (err, response) => {
      if (err) {
        dispatch({
          type: 'FORGE_OPERATION_ERR',
          payload: err
        });
      }
      dispatch({
        type: 'FORGE_OPERATION_ERR',
        payload: response
      });
    });
  };
}
export function preApplyOperationsAction(payload) {
  return dispatch => {
    preApplyOperations(payload, (err, response) => {
      if (err) {
        dispatch({
          type: 'PRE_APPLY_OPERATIONS_ERR',
          payload: err
        });
      }
      dispatch({
        type: 'PRE_APPLY_OPERATIONS',
        payload: response
      });
    });
  };
}
export function injectOperationAction(payload) {
  return dispatch => {
    injectOperation(payload, (err, response) => {
      if (err) {
        dispatch({
          type: 'PRE_APPLY_OPERATIONS_ERR',
          payload: err
        });
      }
      dispatch({
        type: 'PRE_APPLY_OPERATIONS',
        payload: response
      });
    });
  };
}
