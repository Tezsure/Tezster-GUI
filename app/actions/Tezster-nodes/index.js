import CheckConnectionStatus from './Helper/index';
import installTezsterImage from './install-localnode-image';

// eslint-disable-next-line camelcase
const {
  TEZSTER_IMAGE,
  TEZSTER_CONTAINER_NAME,
} = require('../../db-config/helper.dbConfig').GetLocalStorage();

const CHECK_DOCKER_VERSION = 'docker -v';

export default function installLocalnodesAction(args) {
  const checkConnectionStatus = {
    connectionType: '',
  };
  return async (dispatch) => {
    checkConnectionStatus.connectionType = 'INTERNET';
    const isInternetAvailable = await CheckConnectionStatus(
      checkConnectionStatus
    );
    checkConnectionStatus.connectionType = 'DOCKER_INSTALL_STATUS';
    checkConnectionStatus.command = CHECK_DOCKER_VERSION;
    const isDockerInstalled = await CheckConnectionStatus(
      checkConnectionStatus
    );
    checkConnectionStatus.connectionType = 'CHECK_DOCKER_IMAGE';
    checkConnectionStatus.command = TEZSTER_IMAGE;
    const isTezsterImagePresent = await CheckConnectionStatus(
      checkConnectionStatus
    );
    checkConnectionStatus.connectionType = 'CHECK_CONTAINER_PRESENT';
    checkConnectionStatus.command = TEZSTER_CONTAINER_NAME;
    const isTezsterContainerPresent = await CheckConnectionStatus(
      checkConnectionStatus
    );
    checkConnectionStatus.connectionType = 'CHECK_CONTAINER_RUNNING';
    checkConnectionStatus.command = TEZSTER_CONTAINER_NAME;
    const isTezsterContainerRunning = await CheckConnectionStatus(
      checkConnectionStatus
    );
    dispatch({
      type: 'STARTING_NODES',
      payload: {
        loader: true,
      },
    });
    if (!isDockerInstalled) {
      setTimeout(
        () =>
          dispatch({
            type: 'STARTING_NODES',
            payload: {
              loader: false,
            },
          }),
        4000
      );
      return dispatch({
        type: 'TEZSTER_ERROR',
        payload: 'Docker is not install on your system.',
      });
    }
    if (!isInternetAvailable && !isTezsterImagePresent) {
      setTimeout(
        () =>
          dispatch({
            type: 'STARTING_NODES',
            payload: {
              loader: false,
            },
          }),
        4000
      );
      return dispatch({
        type: 'TEZSTER_ERROR',
        payload: 'Internet unavailable.',
      });
    }
    // eslint-disable-next-line no-prototype-builtins
    if (isTezsterImagePresent.hasOwnProperty('msg')) {
      setTimeout(
        () =>
          dispatch({
            type: 'STARTING_NODES',
            payload: {
              loader: false,
            },
          }),
        6000
      );
      return dispatch({
        type: 'TEZSTER_ERROR',
        payload: isTezsterImagePresent.msg,
      });
    }
    return dispatch(
      installTezsterImage({
        isTezsterImagePresent,
        isTezsterContainerPresent,
        isTezsterContainerRunning,
        ...args,
      })
    );
  };
}
