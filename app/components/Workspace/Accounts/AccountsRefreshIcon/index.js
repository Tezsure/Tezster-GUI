/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

function index(props) {
  return (
    <span className="button-accounts">
      <svg
        className={
          props.spinnerLoading
            ? 'bi bi-arrow-repeat refresh-icon'
            : 'bi bi-arrow-repeat'
        }
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        fill="currentColor"
        style={{
          cursor: 'pointer',
          color: '#727d95',
          width: '20%',
          height: '80%',
        }}
        onClick={props.handleSpinnerloading}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z"
          clipRule="evenodd"
        />
        <title>Click to refresh balance</title>
      </svg>
    </span>
  );
}

export default index;
