/* eslint-disable func-names */
import Docker from 'dockerode';
import { getAccountsAction } from '../Workspace/accounts';
import { setTezsterConfigAction } from '../Onboard';

import checkConnectionStatus from './Helper/index';

const TEZSTER_IMAGE = 'tezsureinc/tezster:1.0.2';
const TEZSTER_CONTAINER_NAME = 'tezster';
const CHECK_DOCKER_VERSION = 'docker -v';

export default function installTezsterCliAction(args) {
  const checkInternetConnectionStatus = {
    connectionType: '',
  };
  return async (dispatch) => {
    checkInternetConnectionStatus.connectionType = 'INTERNET';
    const isInternetAvailable = await checkConnectionStatus(
      checkInternetConnectionStatus
    );
    checkInternetConnectionStatus.connectionType = 'DOCKER_INSTALL_STATUS';
    checkInternetConnectionStatus.command = CHECK_DOCKER_VERSION;
    const isDockerInstalled = await checkConnectionStatus(
      checkInternetConnectionStatus
    );
    checkInternetConnectionStatus.connectionType = 'CHECK_DOCKER_IMAGE';
    checkInternetConnectionStatus.command = TEZSTER_IMAGE;
    const isTezsterImagePresent = await checkConnectionStatus(
      checkInternetConnectionStatus
    );
    checkInternetConnectionStatus.connectionType = 'CHECK_CONTAINER_PRESENT';
    checkInternetConnectionStatus.command = TEZSTER_CONTAINER_NAME;
    const isTezsterContainerPresent = await checkConnectionStatus(
      checkInternetConnectionStatus
    );
    checkInternetConnectionStatus.connectionType = 'CHECK_CONTAINER_RUNNING';
    checkInternetConnectionStatus.command = TEZSTER_CONTAINER_NAME;
    const isTezsterContainerRunning = await checkConnectionStatus(
      checkInternetConnectionStatus
    );
    dispatch({
      type: 'STARTING_NODES',
      payload: {
        loader: true,
      },
    });
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
        payload: 'Internet unavailable',
      });
    }
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
        payload: 'Docker is not install on your system',
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

function installTezsterImage(args) {
  let payload = {};
  let subImages = [];
  const docker = new Docker();
  let progressPercentage;
  let totalProgressPercentage;
  let previousProgressPercentage = 0;
  const { isTezsterImagePresent } = args;
  return (dispatch) => {
    if (!isTezsterImagePresent) {
      docker.pull(TEZSTER_IMAGE, (err, stream) => {
        docker.modem.followProgress(stream, onFinished, onProgress);
        function onFinished(error, output) {
          if (error) {
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
              payload: 'Error in installing tezster',
            });
          }
          dispatch({
            type: 'TEZSTER_START_NODES',
            payload: {
              msg: `Download Complete`,
              enum: 'DOWNLOAD_COMPLETE',
              totalProgressPercentage: 100,
              output,
            },
          });
          return dispatch(installTezsterContainer(args));
        }
        function onProgress(event) {
          const msg = 'Downloading';
          switch (event.status) {
            case 'Pulling from tezsureinc/tezster':
              payload = {
                msg,
                enum: 'STARTING_DOWNLOAD',
              };
              return dispatch({
                type: 'TEZSTER_START_NODES',
                payload,
              });
            case 'Pulling fs layer':
              subImages.push({
                id: event.id,
                progress: 0,
              });
              return true;
            case 'Downloading':
              progressPercentage =
                (parseInt(event.progressDetail.current, 10) /
                  parseInt(event.progressDetail.total, 10)) *
                100;
              totalProgressPercentage = 0;
              subImages = subImages.map((elem) => {
                if (elem.id === event.id) {
                  totalProgressPercentage += progressPercentage;
                  return {
                    ...elem,
                    progress: progressPercentage,
                  };
                }
                totalProgressPercentage += elem.progress;
                return elem;
              });
              totalProgressPercentage /= subImages.length;
              payload = {
                msg,
                sub_msg: `Downloading ${event.id}`,
                enum: 'STARTING_STREAM',
                totalProgressPercentage,
                subImages,
              };
              if (
                parseInt(previousProgressPercentage.toFixed(), 10) <
                parseInt(totalProgressPercentage.toFixed(), 10)
              ) {
                previousProgressPercentage = totalProgressPercentage;
                return dispatch({
                  type: 'TEZSTER_START_NODES',
                  payload,
                });
              }
              break;
            default:
              return false;
          }
        }
      });
    } else if (isTezsterImagePresent) {
      return dispatch(installTezsterContainer(args));
    }
  };
}

function installTezsterContainer(args) {
  const { isTezsterContainerPresent, isTezsterContainerRunning } = args;
  const docker = new Docker();
  return (dispatch) => {
    if (!isTezsterContainerPresent && !isTezsterContainerRunning) {
      dispatch({
        type: 'TEZSTER_START_NODES',
        payload: {
          msg: `Starting localnodes please wait`,
          enum: 'STARTING_STREAM',
          totalProgressPercentage: 0,
        },
      });
      docker.createContainer(
        {
          name: `${TEZSTER_CONTAINER_NAME}`,
          Image: `${TEZSTER_IMAGE}`,
          Tty: true,
          ExposedPorts: {
            '18731/tcp': {},
            '18732/tcp': {},
            '18733/tcp': {},
          },
          PortBindings: {
            '18731/tcp': [
              {
                HostPort: '18731',
              },
            ],
            '18732/tcp': [
              {
                HostPort: '18732',
              },
            ],
            '18733/tcp': [
              {
                HostPort: '18733',
              },
            ],
          },
          NetworkMode: 'host',
          Cmd: [
            '/bin/bash',
            '-c',
            'cd /usr/local/bin && start_nodes.sh && tail -f /dev/null',
          ],
        },
        (err, container) => {
          if (err) {
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
              payload: 'Error in starting nodes',
            });
          }
          return dispatch(runExec({ container, args }));
        }
      );
    } else if (isTezsterContainerPresent && !isTezsterContainerRunning) {
      dispatch({
        type: 'TEZSTER_START_NODES',
        payload: {
          msg: `Starting localnodes please wait`,
          enum: 'STARTING_STREAM',
          totalProgressPercentage: 0,
        },
      });
      docker.listContainers({ all: true }, (err, containers) => {
        if (err) {
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
            payload: 'Unable to fetch containers',
          });
        }
        const containerId = containers.filter((elem) =>
          elem.Names[0].includes('tezster')
        )[0].Id;
        const container = docker.getContainer(containerId);
        return dispatch(runExec({ container, args }));
      });
    } else {
      setTimeout(() => {
        dispatch(changeNodesStatus());
        return dispatch({
          type: 'STARTING_NODES',
          payload: {
            loader: false,
          },
        });
      }, 4000);
      dispatch({
        type: 'TEZSTER_SHOW_STOP_NODES',
        payload: true,
      });
      return dispatch({
        type: 'TEZSTER_START_NODES',
        payload: { msg: 'Nodes are already running' },
      });
    }
  };
}
function changeNodesStatus() {
  return (dispatch) => {
    dispatch({
      type: 'TEZSTER_CLI_ERR',
      payload: false,
    });
    dispatch({
      type: 'TEZSTER_CLI_SUCCESS',
      payload: true,
    });
  };
}
function runExec({ container, args }) {
  const checkInternetConnectionStatus = {
    connectionType: '',
  };
  checkInternetConnectionStatus.connectionType = 'TEZSTER_RUNNING';
  checkInternetConnectionStatus.command = TEZSTER_CONTAINER_NAME;
  let totalProgressPercentage = 0;
  let progressInterval;
  return (dispatch) => {
    container.start((error, data) => {
      if (error) {
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
          payload: 'Error in starting nodes',
        });
      }
      dispatch({
        type: 'STARTING_NODES',
        payload: {
          loader: true,
        },
      });
      progressInterval = setInterval(async () => {
        totalProgressPercentage += 2.5;
        const isTezsterRunning = await checkConnectionStatus(
          checkInternetConnectionStatus
        );
        if (!isTezsterRunning && totalProgressPercentage < 100) {
          return dispatch({
            type: 'TEZSTER_START_NODES',
            payload: {
              msg: `Starting localnodes please wait`,
              enum: 'STARTING_STREAM',
              totalProgressPercentage,
            },
          });
        }
        if (isTezsterRunning || totalProgressPercentage >= 100) {
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
            type: 'TEZSTER_START_NODES',
            payload: {
              msg: 'Nodes started successfully',
              totalProgressPercentage: 100,
              data,
            },
          });
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: true,
          });
          dispatch(setTezsterConfigAction());
          dispatch(getAccountsAction(args));
          return clearInterval(progressInterval);
        }
      }, 1000);
      clearInterval(totalProgressPercentage);
    });
  };
}
