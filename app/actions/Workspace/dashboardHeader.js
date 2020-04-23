/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { exec } from 'child_process';
import swal from 'sweetalert';
import { apiEndPoints } from '../../apis/config';

const { getBlockHeight, getBlockData } = require('../../apis/tzstats.service');

const localnodeData = {
  chainId: '00',
  currentBlock: '00',
  gas_limit: '32311',
  gas_price: '0.1228',
  networkId: 'Localnode',
  rpcServer: 'http://localhost:18731',
};

function checkIsLocalNodeRunning() {
  return new Promise((resolve, reject) => {
    exec(
      'tezster get-balance tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
      (err, stdout) => {
        if (err || stdout.split('ECONNREFUSED').length > 1) {
          return reject(false);
        }
        return resolve(true);
      }
    );
  });
}

export function getDashboardHeaderAction(args) {
  return (dispatch) => {
    if (args.dashboardHeader.networkId === 'Localnode') {
      dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: localnodeData,
      });
    } else {
      getBlockHeight(args, (blockHeightError, blockHeightResponse) => {
        if (blockHeightError) {
          dispatch({
            type: 'GET_DASHBOARD_HEADER_ERR',
            payload: blockHeightError,
          });
        }
        getBlockData(
          { blockId: blockHeightResponse.height, ...args },
          (blockDataError, blockDataResponse) => {
            if (blockDataError) {
              dispatch({
                type: 'GET_DASHBOARD_HEADER_ERR',
                payload: blockDataError,
              });
            }
            dispatch({
              type: 'GET_DASHBOARD_HEADER',
              payload: {
                currentBlock: blockHeightResponse.height,
                chainId: blockHeightResponse.height,
                networkId: args.dashboardHeader.networkId,
                rpcServer: apiEndPoints[args.dashboardHeader.networkId],
                ...blockDataResponse,
                ...blockHeightResponse,
              },
            });
          }
        );
      });
    }
  };
}

export function handleNetworkChangeAction(args) {
  let { networkId } = args.dashboardHeader;
  return (dispatch) => {
    if (networkId === 'Localnode') {
      checkIsLocalNodeRunning().then((IsLocalNodeRunning) => {
        if (!IsLocalNodeRunning) {
          networkId = 'Carthagenet-Tezster';
          swal(
            'Error!',
            'Tezster cli is not running cannot toggle to Localnode',
            'error'
          );
          return dispatch({
            type: 'GET_DASHBOARD_HEADER',
            payload: args.dashboardHeader,
          });
        }
        return dispatch({
          type: 'GET_DASHBOARD_HEADER',
          payload: localnodeData,
        });
      });
    } else {
      getBlockHeight(args, (blockHeightError, blockHeightResponse) => {
        if (blockHeightError) {
          dispatch({
            type: 'GET_DASHBOARD_HEADER_ERR',
            payload: blockHeightError,
          });
        }
        getBlockData(
          { blockId: blockHeightResponse.height, ...args },
          (blockDataError, blockDataResponse) => {
            if (blockDataError) {
              dispatch({
                type: 'GET_DASHBOARD_HEADER_ERR',
                payload: blockDataError,
              });
            }
            dispatch({
              type: 'GET_DASHBOARD_HEADER',
              payload: {
                currentBlock: blockHeightResponse.height,
                chainId: blockHeightResponse.height,
                rpcServer: apiEndPoints[networkId],
                networkId,
                ...blockDataResponse,
                ...blockHeightResponse,
              },
            });
          }
        );
      });
    }
  };
}
