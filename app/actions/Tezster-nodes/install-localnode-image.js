/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable func-names */
import Docker from 'dockerode';
import installTezsterContainer from './start-container';
// eslint-disable-next-line camelcase
const {
  TEZSTER_IMAGE,
} = require('../../db-config/helper.dbConfig').GetLocalStorage();
const ip = require('docker-ip');

export default function installTezsterImage(args) {
  let payload = {};
  let subImages = [];
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
  let progressPercentage;
  let totalProgressPercentage;
  let previousProgressPercentage = 0;
  const { isTezsterImagePresent } = args;
  return (dispatch) => {
    if (!isTezsterImagePresent) {
      dispatch({
        type: 'TEZSTER_ERROR',
        payload: '',
      });
      dispatch({
        type: 'STARTING_NODES',
        payload: {
          loader: true,
        },
      });
      dispatch({
        type: 'TEZSTER_START_NODES',
        payload: {
          msg: `Starting localnodes setup...`,
          totalProgressPercentage: 0,
        },
      });
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
              payload: 'Error in setting up nodes.',
            });
          }
          dispatch({
            type: 'TEZSTER_START_NODES',
            payload: {
              msg: `Setup completed successfully.`,
              enum: 'DOWNLOAD_COMPLETE',
              totalProgressPercentage: 100,
              output,
            },
          });
          return setTimeout(() => {
            return dispatch(installTezsterContainer(args));
          }, 2000);
        }
        function onProgress(event) {
          const msg = 'Downloading';
          switch (event.status) {
            case `Pulling from ${TEZSTER_IMAGE}`:
              payload = {
                msg,
                totalProgressPercentage: 0,
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
