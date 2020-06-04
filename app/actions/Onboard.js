/* eslint-disable no-unused-vars */
import { RpcRequest } from '../apis/getAccountBalance';

const config = require('../apis/config');

const url = config.provider;

export function handleLocalnodesActionChange() {
  return {
    type: 'TEZSTER_NODES_SUCCESS',
    payload: true,
  };
}

export function checkLocalnodesAction() {
  return (dispatch) => {
    dispatch({
      type: 'TEZSTER_NODES_PENDING_STATUS',
      payload: false,
    });
    RpcRequest.checkNodeStatus(url)
      .then((res) => {
        if (res.protocol.startsWith('PsCARTHAG')) {
          return setTimeout(() => {
            dispatch({
              type: 'TEZSTER_SHOW_STOP_NODES',
              payload: true,
            });
            return dispatch({
              type: 'TEZSTER_NODES_SUCCESS',
              payload: true,
            });
          }, 4000);
        }
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
          return dispatch({
            type: 'TEZSTER_NODES_ERR',
            payload: false,
          });
        }, 1000);
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
              type: 'TEZSTER_SHOW_STOP_NODES',
              payload: true,
            });
            return dispatch({
              type: 'TEZSTER_NODES_SUCCESS',
              payload: true,
            });
          }, 1000);
        }
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
          return dispatch({
            type: 'TEZSTER_NODES_ERR',
            payload: false,
          });
        }, 1000);
      });
  };
}
export function getLocalnodesRunningState() {
  return new Promise((resolve, reject) => {
    RpcRequest.checkNodeStatus(url)
      .then((res) => {
        if (res.protocol.startsWith('PsCARTHAG')) {
          return resolve(true);
        }
        return resolve(false);
      })
      .catch((exp) => {
        return resolve(false);
      });
  });
}
