/* eslint-disable func-names */
import Docker from 'dockerode';
import { getBalanceAction } from '../Workspace/Accounts';
import { setTezsterConfigAction } from '../Onboard';

import CheckConnectionStatus from './Helper/index';

// eslint-disable-next-line camelcase
const {
  TEZSTER_IMAGE,
  TEZSTER_CONTAINER_NAME,
} = require('../../config/tezster.config');

export default function installTezsterContainer(args) {
  const { isTezsterContainerPresent, isTezsterContainerRunning } = args;
  const docker = new Docker();
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
      dispatch(getBalanceAction(args));
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
              msg: 'Nodes started successfully.',
              totalProgressPercentage: 100,
              data,
            },
          });
          dispatch({
            type: 'TEZSTER_SHOW_STOP_NODES',
            payload: true,
          });
          dispatch(setTezsterConfigAction());
          // eslint-disable-next-line no-param-reassign
          args.isAvailableLocalnodes = true;
          dispatch(getBalanceAction(args));
        }
        if (isTezsterRunning && totalProgressPercentage > 100) {
          return clearInterval(progressInterval);
        }
      }, 1000);
      clearInterval(totalProgressPercentage);
    });
  };
}
