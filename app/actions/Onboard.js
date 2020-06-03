/* eslint-disable no-unused-vars */
import { RpcRequest } from '../apis/getAccountBalance';

const config = require('../apis/config');

const url = config.provider;

export function handleTezsterCliActionChange() {
  return {
    type: 'TEZSTER_CLI_SUCCESS',
    payload: true,
  };
}

export function checkTezsterCliAction() {
  return (dispatch) => {
    dispatch({
      type: 'TEZSTER_CLI_PENDING',
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
              type: 'TEZSTER_CLI_SUCCESS',
              payload: true,
            });
          }, 4000);
        } else {
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: false,
          });
          return dispatch({
            type: 'TEZSTER_CLI_ERR',
            payload: false,
          });
        }
      })
      .catch((exp) => {
        setTimeout(() => {
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: false,
          });
          return dispatch({
            type: 'TEZSTER_CLI_ERR',
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
              type: 'TEZSTER_CLI_SUCCESS',
              payload: true,
            });
          }, 1000);
        } else {
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: false,
          });
          return dispatch({
            type: 'TEZSTER_CLI_ERR',
            payload: false,
          });
        }
      })
      .catch((exp) => {
        setTimeout(() => {
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: false,
          });
          return dispatch({
            type: 'TEZSTER_CLI_ERR',
            payload: false,
          });
        }, 1000);
      });
  };
}
export function getTezsterCliRunningState() {
  return new Promise((resolve, reject) => {
    RpcRequest.fetchBalance(url, testPkh)
      .then((res) => {
        const balance = (parseInt(res, 10) / 1000000).toFixed(3);
        return resolve(true);
      })
      .catch((exp) => {
        return resolve(false);
      });
  });
}
