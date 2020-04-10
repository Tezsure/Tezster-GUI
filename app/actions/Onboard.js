import { exec } from 'child_process';

const config = require('../apis/config');

export function checkTezsterCliAction() {
  return dispatch => {
    dispatch({
      type: 'TEZSTER_CLI_PENDING',
      payload: false
    });
    setTimeout(() => {
      exec(
        'tezster get-balance tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
        (err, stdout) => {
          if (err || stdout.split('ECONNREFUSED').length > 1) {
            dispatch({
              type: 'TEZSTER_CLI_ERR',
              payload: false
            });
          } else {
            dispatch({
              type: 'TEZSTER_CLI_SUCCESS',
              payload: true
            });
          }
        }
      );
    }, 1000);
  };
}

export function getLocalConfigAction() {
  return {
    type: 'TEZSTER_LOCAL_CONFIG',
    payload: config
  };
}
