/* eslint-disable no-unused-vars */
import { RpcRequest } from './Workspace/Accounts/helper.accounts';

const config = require('../config/tezster.config');

const url = config.provider;

export function handleLocalnodesActionChange() {
  return (dispatch) => {
    dispatch({
      type: 'TEZSTER_SHOW_DASHBOARD',
      payload: true,
    });
  };
}

export function checkLocalnodesAction() {
  return (dispatch) => {
    dispatch({
      type: 'TEZSTER_SHOW_DASHBOARD_PENDING',
      payload: false,
    });
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
