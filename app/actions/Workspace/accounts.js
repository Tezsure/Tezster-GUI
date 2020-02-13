const { getContracts, getBalance } = require('../app.service.js');

export function getAccountsAction(payload) {
  return dispatch => {
    if (
      localStorage.getItem('reduxState') &&
      JSON.parse(localStorage.getItem('reduxState')).userAccounts &&
      JSON.parse(localStorage.getItem('reduxState')).userAccounts.length > 0
    ) {
      const accounts = JSON.parse(localStorage.getItem('reduxState'))
        .userAccounts;
      dispatch({
        type: 'GET_ACCOUNTS',
        payload: accounts
      });
    } else {
      getContracts(payload.dashboardHeader.networkId, (err, result) => {
        if (err) {
          dispatch({
            type: 'GET_ACCOUNTS_ERR',
            payload: err
          });
        }
        const accountsWithBalance = result.map(async res => {
          const balance = await getBalanceForAccounts({
            env: payload.dashboardHeader.networkId,
            contracts: res
          });
          return balance;
        });
        Promise.all(accountsWithBalance)
          .then(accounts => {
            return dispatch({
              type: 'GET_ACCOUNTS',
              payload: accounts
            });
          })
          .catch(exceptions => {
            dispatch({
              type: 'GET_ACCOUNTS_ERR',
              payload: exceptions
            });
          });
      });
    }
  };
}

function getBalanceForAccounts(payload) {
  return new Promise(resolve => {
    getBalance(
      { env: payload.env, contracts: payload.contracts },
      (error, response) => {
        if (error) {
          resolve({ contracts: payload.contracts, balance: 0 });
        }
        resolve({ contracts: payload.contracts, balance: response });
      }
    );
  });
}

export function getBalanceAction(payload) {
  return dispatch =>
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
}

export function createAccountsAction(payload) {
  const env = payload.dashboardHeader.networkId;
  if (env === 'Localnode') {
    payload.userAccounts.push({ contracts: payload.optionalKey, balance: 0 });
    return {
      type: 'GET_ACCOUNTS',
      payload: payload.userAccounts
    };
  }
  const balance = getBalanceForAccounts({
    env: payload.dashboardHeader.networkId,
    contracts: payload.optionalKey
  });
  payload.userAccounts.push({
    contracts: payload.optionalKey,
    balance
  });
  return {
    type: 'GET_ACCOUNTS',
    payload: payload.userAccounts
  };
}
