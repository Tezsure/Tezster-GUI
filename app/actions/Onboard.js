import { exec } from 'child_process';

export default function checkTezsterCliAction() {
  return dispatch => {
    exec('tezster --version', (err, stdout) => {
      if (err) {
        dispatch({
          type: 'TEZSTER_CLI_ERR',
          payload: false
        });
      }
      dispatch({
        type: 'TEZSTER_CLI_SUCCESS',
        payload: true
      });
    });
  };
}
