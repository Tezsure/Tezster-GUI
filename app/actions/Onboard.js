/* eslint-disable no-unused-vars */
import { exec, spawn } from 'child_process';

const config = require('../apis/config');

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
    setTimeout(() => {
      if (process.platform.split('win').length > 1) {
        const ls = spawn(
          'cmd.exe',
          [
            '/c',
            `powershell.exe tezster get-balance ${config.identities[0].pkh}`,
          ],
          { detached: false }
        );
        ls.stdout.on('data', (data) => {
          dispatch({
            type: 'TEZSTER_CLI_ERR',
            payload: true,
          });
        });
        ls.stderr.on('data', (data) => {
          dispatch({
            type: 'TEZSTER_CLI_ERR',
            payload: false,
          });
        });
        ls.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
      } else {
        exec(
          `tezster get-balance ${config.identities[0].pkh}`,
          (err, stdout) => {
            if (
              err ||
              stdout.includes('ECONNREFUSED') ||
              stdout.includes('Error')
            ) {
              return dispatch({
                type: 'TEZSTER_CLI_ERR',
                payload: false,
              });
            }
            return dispatch({
              type: 'TEZSTER_CLI_SUCCESS',
              payload: true,
            });
          }
        );
      }
    }, 1000);
  };
}

export function getLocalConfigAction() {
  return {
    type: 'TEZSTER_LOCAL_CONFIG',
    payload: config,
  };
}
