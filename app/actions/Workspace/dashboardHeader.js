/* eslint-disable no-unused-vars */
/* eslint-disable promise/catch-or-return */
/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { exec, spawn } from 'child_process';
import swal from 'sweetalert';
import { apiEndPoints, identities } from '../../apis/config';

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
  return new Promise((resolve) => {
    if (process.platform.split('win').length > 1) {
      const ls = spawn(
        'cmd.exe',
        ['/c', `powershell.exe tezster get-balance ${identities[0].pkh}`],
        { detached: false }
      );
      ls.stdout.on('data', (data) => {
        resolve(true);
      });
      ls.stderr.on('data', (data) => {
        resolve(false);
      });
      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    } else {
      exec(`tezster get-balance ${identities[0].pkh}`, (err, stdout) => {
        if (
          err ||
          stdout.includes('ECONNREFUSED') ||
          stdout.includes('Error')
        ) {
          return resolve(false);
        }
        return resolve(true);
      });
    }
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
        if (
          !IsLocalNodeRunning &&
          process.platform.includes('linux') &&
          networkId === 'Localnode'
        ) {
          return dispatch({
            type: 'GET_DASHBOARD_HEADER',
            payload: localnodeData,
          });
        }
        if (!IsLocalNodeRunning) {
          networkId = 'Carthagenet-Tezster';
          swal(
            'Error!',
            'Tezster cli is not running cannot change network to Localnode',
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
