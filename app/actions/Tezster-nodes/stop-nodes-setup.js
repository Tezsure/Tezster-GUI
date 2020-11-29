/* eslint-disable prettier/prettier */
import Docker from 'dockerode';
import { setTezsterConfigAction } from '../Onboard';

const ip = require('docker-ip');
const config = require('../../db-config/helper.dbConfig');

export default function stopTezsterNodesAction() {
  const { TEZSTER_CONTAINER_NAME } = config.GetLocalStorage();
  let ProcessConfig;
  if (process.platform.includes('win') || process.platform.includes('darwin')) {
    ProcessConfig = {
      host: `http://${ip()}`,
    };
  } else {
    ProcessConfig = {
      socketPath: '/var/run/docker.sock',
      hosts: 'tcp://0.0.0.0:2376',
    };
  }
  const docker = new Docker(ProcessConfig);
  return (dispatch) => {
    docker
      .getContainer(TEZSTER_CONTAINER_NAME)
      .inspect()
      .then((result) => {
        if (
          result.State.Status === 'exited' ||
          result.State.Status === 'running'
        ) {
          return dispatch(stopAndRemoveContainer());
        }
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
        dispatch({
          type: 'TEZSTER_SHOW_STOP_NODES',
          payload: false,
        });
        dispatch({
          type: 'GET_ACCOUNTS',
          payload: [],
        });
        dispatch(setTezsterConfigAction());
        return dispatch({
          type: 'TEZSTER_STOP_NODES',
          payload: {
            msg: 'Nodes already stopped.',
          },
        });

      })
      .catch((error) => {
        dispatch({
          type: 'TEZSTER_SHOW_STOP_NODES',
          payload: true,
        });
        return dispatch({
          type: 'TEZSTER_ERROR',
          payload: `Error occurred while stopping the nodes: ${error}`,
        });
      });
  };
}

function stopAndRemoveContainer() {
  const { TEZSTER_CONTAINER_NAME } = config.GetLocalStorage();
  let ProcessConfig;
  if (process.platform.includes('win') || process.platform.includes('darwin')) {
    ProcessConfig = {
      host: `http://${ip()}`,
    };
  } else {
    ProcessConfig = {
      socketPath: '/var/run/docker.sock',
      hosts: 'tcp://0.0.0.0:2376',
    };
  }
  const docker = new Docker(ProcessConfig);
  const container = docker.getContainer(TEZSTER_CONTAINER_NAME);
  const totalProgressPercentage = 40;
  return async (dispatch) => {
    dispatch(stopNodesProgress(totalProgressPercentage));
    // eslint-disable-next-line no-unused-vars
    container.stop((error, data) => {
      if (error) {
        dispatch({
          type: 'TEZSTER_SHOW_STOP_NODES',
          payload: true,
        });
        return dispatch({
          type: 'TEZSTER_ERROR',
          payload: `Error occurred while stopping the nodes: ${error}`,
        });
      }
    });
    await container.remove({
      force: true,
    });
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
    dispatch({
      type: 'TEZSTER_STOP_NODES',
      payload: {
        msg: 'Nodes stopped successfully.',
        totalProgressPercentage: 100,
      },
    });
    dispatch({
      type: 'TEZSTER_SHOW_STOP_NODES',
      payload: false,
    });
    dispatch({
      type: 'GET_ACCOUNTS',
      payload: [],
    });
  }
}

function stopNodesProgress(totalProgressPercentage) {
  return (dispatch) => {
    dispatch({
      type: 'STARTING_NODES',
      payload: {
        loader: true,
      },
    });
    dispatch({
      type: 'TEZSTER_STOP_NODES',
      payload: {
        msg: `Stopping localnodes please wait...`,
        enum: 'STARTING_STREAM',
        totalProgressPercentage,
      },
    });
  };
}
