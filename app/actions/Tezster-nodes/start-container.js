/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
import Docker from 'dockerode';
import { getAccountsAction } from '../Workspace/Accounts';
import { setTezsterConfigAction } from '../Onboard';

import CheckConnectionStatus from './Helper/index';
// eslint-disable-next-line camelcase
const {
  TEZSTER_IMAGE,
  TEZSTER_CONTAINER_NAME,
} = require('../../db-config/helper.dbConfig').GetLocalStorage();
const ip = require('docker-ip');

export default function installTezsterContainer(args) {
  const { isTezsterContainerPresent, isTezsterContainerRunning } = args;
  let ProcessConfig;
  if (process.platform.includes('win')) {
    ProcessConfig = {
      host: `http://${ip()}`,
    };
  } if (process.platform.includes('darwin')) {
    ProcessConfig = {
      socketPath: '/var/run/docker.sock',
    };
  } else {
    ProcessConfig = {
      socketPath: '/var/run/docker.sock',
      hosts: 'tcp://0.0.0.0:2376',
    };
  }
  const docker = new Docker(ProcessConfig);
  return (dispatch) => {
    if (!isTezsterContainerPresent && !isTezsterContainerRunning) {
      dispatch({
        type: 'TEZSTER_START_NODES',
        payload: {
          msg: `Starting localnodes please wait...`,
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
              payload: 'Error in starting nodes.',
            });
          }
          return dispatch(runExec({ container, args }));
        }
      );
    } else if (isTezsterContainerPresent && !isTezsterContainerRunning) {
      dispatch({
        type: 'TEZSTER_START_NODES',
        payload: {
          msg: `Starting localnodes please wait...`,
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
            payload: 'Unable to fetch container running localnodes.',
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
        dispatch(getAccountsAction(args));
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
      dispatch(setTezsterConfigAction());
      // eslint-disable-next-line no-param-reassign
      args.isAvailableLocalnodes = true;
      dispatch(getAccountsAction(args));
      return dispatch({
        type: 'TEZSTER_START_NODES',
        payload: { msg: 'Nodes are already running.' },
      });
    }
  };
}
function runExec({ container, args }) {
  const checkConnectionStatus = {
    connectionType: '',
  };
  checkConnectionStatus.connectionType = 'TEZSTER_RUNNING';
  checkConnectionStatus.command = TEZSTER_CONTAINER_NAME;
  let totalProgressPercentage = 0;
  // eslint-disable-next-line no-unused-vars
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
          payload: 'Error in starting nodes.',
        });
      }
      dispatch({
        type: 'STARTING_NODES',
        payload: {
          loader: true,
        },
      });
      progressInterval = setInterval(async () => {
        const isTezsterRunning = await CheckConnectionStatus(
          checkConnectionStatus
        );
        if (!isTezsterRunning && totalProgressPercentage < 100) {
          totalProgressPercentage += 2.5;
          dispatch({
            type: 'TEZSTER_START_NODES',
            payload: {
              msg: `Starting localnodes please wait...`,
              enum: 'STARTING_STREAM',
              totalProgressPercentage,
            },
          });
        }
        if (isTezsterRunning && totalProgressPercentage <= 100) {
          totalProgressPercentage += 2.5;
          setTimeout(() => {
            dispatch({
              type: 'STARTING_NODES',
              payload: {
                loader: false,
              },
            });
            return clearInterval(progressInterval);
          }, 4000);
          // eslint-disable-next-line no-param-reassign
          args.isAvailableLocalnodes = true;
          dispatch(getAccountsAction(args));
          dispatch(setTezsterConfigAction());
          dispatch({
            type: 'TEZSTER_START_NODES',
            payload: {
              msg: 'Nodes started successfully.',
              totalProgressPercentage: 100,
              data,
            },
          });
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: true,
          });
        }
        if (!isTezsterRunning && totalProgressPercentage > 100) {
          setTimeout(() => {
            dispatch({
              type: 'STARTING_NODES',
              payload: {
                loader: false,
              },
            });
            dispatch({
              type: 'TEZSTER_ERROR',
              payload: 'Error in starting nodes.',
            });
            return clearInterval(progressInterval);
          }, 4000);
          dispatch({
            type: 'TEZSTER_ERROR',
            payload: 'Error in starting nodes.',
          });
        }
        if (isTezsterRunning && totalProgressPercentage > 100) {
          setTimeout(() => {
            dispatch({
              type: 'STARTING_NODES',
              payload: {
                loader: false,
              },
            });
            return clearInterval(progressInterval);
          }, 4000);
          // eslint-disable-next-line no-param-reassign
          args.isAvailableLocalnodes = true;
          dispatch(getAccountsAction(args));
          dispatch(setTezsterConfigAction());
          dispatch({
            type: 'TEZSTER_START_NODES',
            payload: {
              msg: 'Nodes started successfully.',
              totalProgressPercentage: 100,
              data,
            },
          });
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: true,
          });
        }
      }, 1000);
      clearInterval(totalProgressPercentage);
    });
  };
}
