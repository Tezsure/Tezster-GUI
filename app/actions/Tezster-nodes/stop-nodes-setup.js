/* eslint-disable no-unused-vars */
import Docker from 'dockerode';
import CheckConnectionStatus from './Helper/index';
import { setTezsterConfigAction } from '../Onboard';

const TEZSTER_IMAGE = 'tezsureinc/tezster:1.0.2';
const TEZSTER_CONTAINER_NAME = 'tezster';

export function startTezsterNodesAction() {
  const docker = new Docker();
  const checkConnectionStatus = {
    connectionType: '',
  };
  return async (dispatch) => {
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
    if (!isTezsterContainerPresent && !isTezsterContainerRunning) {
      docker.createContainer(
        {
          name: `${TEZSTER_CONTAINER_NAME}`,
          Image: `${TEZSTER_IMAGE}`,
          Tty: true,
          ExposedPorts: {
            '18731/tcp': {},
          },
          Hostconfig: {
            PortBindings: {
              '18731/tcp': [
                {
                  HostPort: '18732',
                },
              ],
            },
          },
          Cmd: [
            '/bin/bash',
            '-c',
            'cd /usr/local/bin && start_nodes.sh && tail -f /dev/null',
          ],
        },
        (err, data, container) => {
          if (err) {
            return dispatch({
              type: 'TEZSTER_ERROR',
              payload: 'Error in starting nodes',
            });
          }
          return dispatch({
            type: 'TEZSTER_START_NODES',
            payload: {
              msg: 'Nodes started successfully',
              ...data,
              ...container,
            },
          });
        }
      );
    } else if (!isTezsterContainerRunning) {
      docker.listContainers({ all: true }, (err, containers) => {
        if (err) {
          return dispatch({
            type: 'TEZSTER_ERROR',
            payload: 'Unable to fetch containers',
          });
        }
        const containerId = containers.filter((elem) =>
          elem.Names[0].includes('tezster')
        )[0].Id;
        const container = docker.getContainer(containerId);
        container.start((error, data) => {
          return dispatch({
            type: 'TEZSTER_START_NODES',
            payload: {
              msg: 'Nodes started successfully',
              data,
            },
          });
        });
      });
    } else {
      return dispatch({
        type: 'TEZSTER_START_NODES',
        payload: { msg: 'Nodes already running' },
      });
    }
  };
}

export function stopTezsterNodesAction() {
  const docker = new Docker();
  const checkConnectionStatus = {
    connectionType: '',
  };
  let progressInterval;
  let totalProgressPercentage = 0;
  return async (dispatch) => {
    dispatch(stopNodesProgress(totalProgressPercentage));
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
    if (isTezsterContainerPresent && isTezsterContainerRunning) {
      totalProgressPercentage += 10;
      dispatch(stopNodesProgress(totalProgressPercentage));
      docker.listContainers({ all: true }, (err, containers) => {
        if (err) {
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: true,
          });
          return dispatch({
            type: 'TEZSTER_ERROR',
            payload: 'Unable to fetch containers.',
          });
        }
        const containerId = containers.filter((elem) =>
          elem.Names[0].includes('tezster')
        )[0].Id;
        if (containerId) {
          progressInterval = setInterval(async () => {
            totalProgressPercentage += 10;
            const isTezsterRunning = await CheckConnectionStatus(
              checkConnectionStatus
            );
            if (isTezsterRunning && totalProgressPercentage < 100) {
              dispatch(stopNodesProgress(totalProgressPercentage));
            }
            if (!isTezsterRunning || totalProgressPercentage >= 80) {
              return clearInterval(progressInterval);
            }
          }, 1000);
          docker.getContainer(containerId).stop((error, response) => {
            if (error) {
              dispatch({
                type: 'TEZSTER_SHOW_STOP_NODES',
                payload: true,
              });
              return dispatch({
                type: 'TEZSTER_ERROR',
                payload: 'Unable to stop container.',
              });
            }
            checkConnectionStatus.connectionType = 'TEZSTER_RUNNING';
            checkConnectionStatus.command = TEZSTER_CONTAINER_NAME;
            totalProgressPercentage += 10;
            dispatch(stopNodesProgress(totalProgressPercentage));
            progressInterval = setInterval(async () => {
              totalProgressPercentage += 10;
              const isTezsterRunning = await CheckConnectionStatus(
                checkConnectionStatus
              );
              if (isTezsterRunning && totalProgressPercentage < 100) {
                dispatch(stopNodesProgress(totalProgressPercentage));
              }
              if (!isTezsterRunning && totalProgressPercentage <= 100) {
                dispatch(PostStopNodesTask(totalProgressPercentage));
                return clearInterval(progressInterval);
              }
              if (!isTezsterRunning && totalProgressPercentage > 100) {
                dispatch(PostStopNodesTask(totalProgressPercentage));
                return clearInterval(progressInterval);
              }
            }, 1000);
            clearInterval(totalProgressPercentage);
          });
        } else {
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
            payload: { msg: 'Nodes already stopped.' },
          });
        }
      });
    }
    if (!isTezsterContainerRunning) {
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
        type: 'GET_ACCOUNTS',
        payload: [],
      });
      dispatch({
        type: 'TEZSTER_SHOW_STOP_NODES',
        payload: false,
      });
      dispatch(setTezsterConfigAction());
      return dispatch({
        type: 'TEZSTER_STOP_NODES',
        payload: { msg: 'Nodes already stopped.' },
      });
    }
  };
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

function PostStopNodesTask(containerId) {
  const docker = new Docker();
  return (dispatch) => {
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
    dispatch(setTezsterConfigAction());
    docker.listContainers({ all: true }, (err, containers) => {
      const tezsterContainerId = containers.filter((elem) =>
        elem.Names[0].includes('tezster')
      )[0].Id;
      if (tezsterContainerId)
        docker.getContainer(tezsterContainerId).remove({ force: true });
    });
  };
}
