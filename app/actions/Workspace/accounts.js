const {
  __getBalance,
  __getAccounts,
  __activateAccount,
  __generateMnemonic
} = require('../../apis/eztz.service');

export function toggleAccountsModalAction(modalType) {
  return {
    type: 'TOGGLE_ACCOUNTS_MODAL',
    payload: modalType
  };
}

export function getAccountsAction({ ...params }) {
  return dispatch => {
    if (localStorage.hasOwnProperty('tezsure')) {
      dispatch({
        type: 'GET_ACCOUNTS',
        payload: JSON.parse(localStorage.getItem('tezsure')).userAccounts
      });
    } else {
      __getAccounts({ ...params }, (err, accounts) => {
        if (err) {
          dispatch({
            type: 'GET_ACCOUNTS_ERR',
            payload: err
          });
        }
        Promise.all(accounts).then(response => {
          localStorage.setItem(
            'tezsure',
            JSON.stringify({ userAccounts: response })
          );
          dispatch({
            type: 'GET_ACCOUNTS',
            payload: response
          });
        });
      });
    }
  };
}

export function getBalanceAction(payload) {
  return dispatch => {
    if (localStorage.getItem('tezsure')) {
      dispatch({
        type: 'GET_BALANCE',
        payload: localStorage.getItem('tezsure').userAccounts
      });
    } else {
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
  };
}

export function createAccountsAction(payload) {
  const { userAccounts } = JSON.parse(localStorage.getItem('tezsure'));
  return dispatch => {
    if (payload.dashboardHeader.networkId === 'Localnode') {
      payload.userAccounts.push({ account: payload.optionalKey, balance: 0 });
      dispatch({
        type: 'GET_ACCOUNTS',
        payload: payload.userAccounts
      });
    }
    Promise.all([__getBalance({ ...payload.optionalKey })]).then(response => {
      userAccounts.push(response[0]);
      localStorage.setItem('tezsure', JSON.stringify({ userAccounts }));
      dispatch({
        type: 'GET_ACCOUNTS',
        payload: userAccounts
      });
      dispatch({
        type: 'TOGGLE_ACCOUNTS_MODAL',
        payload: ''
      });
    });
  };
}

export function restoreAccountAction(payload) {
  const { userAccounts } = JSON.parse(localStorage.getItem('tezsure'));
  return dispatch => {
    __activateAccount({ ...payload }, (err, account) => {
      if (err) {
        dispatch({
          type: 'GET_ACCOUNTS_ERR',
          payload: err
        });
      }
      Promise.all([__getBalance({ ...account })]).then(response => {
        userAccounts.push(response[0]);
        localStorage.setItem('tezsure', JSON.stringify({ userAccounts }));
        dispatch({
          type: 'GET_ACCOUNTS',
          payload: userAccounts
        });
        dispatch({
          type: 'TOGGLE_ACCOUNTS_MODAL',
          payload: ''
        });
      });
    });
  };
}
