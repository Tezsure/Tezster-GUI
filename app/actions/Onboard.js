/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import { RpcRequest } from './Workspace/Accounts/helper.accounts';

const config = JSON.parse(localStorage.getItem('db-config'));

const url = config.provider;

export function handleLocalnodesActionChange() {
  return (dispatch) => {
    dispatch({
      type: 'TEZSTER_SHOW_DASHBOARD',
      payload: true,
    });
  };
}

function handleIsValidJson(str) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}

function handleMigrateLocalStorage() {
  let oldLocalStorage = localStorage.getItem('tezster-v2.1');
  let newLocalStorage = localStorage.getItem(config.storageName);
  // const DbConfig = localStorage.getItem('db-config');
  if (
    !newLocalStorage &&
    handleIsValidJson(oldLocalStorage) &&
    JSON.parse(oldLocalStorage).hasOwnProperty('userAccounts') &&
    JSON.parse(oldLocalStorage).hasOwnProperty('contracts')
  ) {
    newLocalStorage = config;
    oldLocalStorage = JSON.parse(oldLocalStorage);
    newLocalStorage.userAccounts = {
      Localnode: config.identities,
      Carthagenet: oldLocalStorage.userAccounts.Carthagenet,
      Mainnet: [],
    };
    newLocalStorage.transactions = {
      Carthagenet: [],
      Localnode: [],
      Mainnet: [],
    };
    newLocalStorage.contracts.Localnode = oldLocalStorage.contracts.Localnode;
    newLocalStorage.contracts.Carthagenet =
      oldLocalStorage.contracts.Carthagenet;
    localStorage.clear();
    localStorage.setItem(config.storageName, JSON.stringify(newLocalStorage));
    return true;
  }
  if (!newLocalStorage) {
    localStorage.clear();
    const payload = {
      ...config,
      userAccounts: {
        Localnode: config.identities,
        Carthagenet: [],
        Mainnet: [],
      },
      transactions: {
        Carthagenet: [],
        Localnode: [],
        Mainnet: [],
      },
    };
    localStorage.setItem(config.storageName, JSON.stringify(payload));
  }
  // if (!DbConfig || !handleIsValidJson(DbConfig)) {
  //   localStorage.setItem('db-config', JSON.stringify(config));
  // }
  return true;
}

export function checkLocalnodesAction() {
  return (dispatch) => {
    dispatch({
      type: 'TEZSTER_SHOW_DASHBOARD_PENDING',
      payload: false,
    });
    handleMigrateLocalStorage();
    RpcRequest.checkNodeStatus(url)
      .then((res) => {
        if (res.protocol.startsWith('PsCARTHAG')) {
          return setTimeout(() => {
            dispatch({
              type: 'LOCAL_NODE_RUNNING_STATUS',
              payload: true,
            });
            dispatch({
              type: 'TEZSTER_SHOW_STOP_NODES',
              payload: true,
            });
            return dispatch({
              type: 'TEZSTER_SHOW_DASHBOARD',
              payload: true,
            });
          }, 4000);
        }
        dispatch({
          type: 'LOCAL_NODE_RUNNING_STATUS',
          payload: false,
        });
        dispatch({
          type: 'TEZSTER_SHOW_STOP_NODES',
          payload: false,
        });
        return dispatch({
          type: 'TEZSTER_NODES_ERR',
          payload: false,
        });
      })
      .catch((exp) => {
        dispatch({
          type: 'TEZSTER_SHOW_STOP_NODES',
          payload: false,
        });
        dispatch({
          type: 'LOCAL_NODE_RUNNING_STATUS',
          payload: false,
        });
        dispatch({
          type: 'TEZSTER_SHOW_DASHBOARD',
          payload: true,
        });
        return dispatch({
          type: 'TEZSTER_NODES_ERR',
          payload: false,
        });
      });
  };
}

export function getLocalConfigAction() {
  return {
    type: 'TEZSTER_LOCAL_CONFIG',
    payload: config,
  };
}
export function setTezsterConfigAction() {
  return (dispatch) => {
    RpcRequest.checkNodeStatus(url)
      .then((res) => {
        if (res.protocol.startsWith('PsCARTHAG')) {
          return setTimeout(() => {
            dispatch({
              type: 'LOCAL_NODE_RUNNING_STATUS',
              payload: true,
            });
            dispatch({
              type: 'TEZSTER_SHOW_STOP_NODES',
              payload: true,
            });
            return dispatch({
              type: 'TEZSTER_SHOW_DASHBOARD',
              payload: true,
            });
          }, 1000);
        }
        dispatch({
          type: 'LOCAL_NODE_RUNNING_STATUS',
          payload: false,
        });
        dispatch({
          type: 'TEZSTER_SHOW_STOP_NODES',
          payload: false,
        });
        return dispatch({
          type: 'TEZSTER_NODES_ERR',
          payload: false,
        });
      })
      .catch((exp) => {
        setTimeout(() => {
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: false,
          });
          dispatch({
            type: 'LOCAL_NODE_RUNNING_STATUS',
            payload: false,
          });
          return dispatch({
            type: 'TEZSTER_NODES_ERR',
            payload: false,
          });
        }, 1000);
      });
  };
}
