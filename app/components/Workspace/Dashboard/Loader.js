/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Checkmark(props) {
  return (
    <div
      className="loader-container"
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <CircularProgressbar
        value={props.totalImageProgress.toFixed()}
        strokeWidth={50}
        styles={buildStyles({
          textColor: 'black',
          backgroundColor: '#3dcc8e',
          strokeLinecap: 'butt',
          pathColor: '#3dcc8e',
          trailColor: '#e9ecef',
          width: '10%',
        })}
      />
      <p className="loader-text">{props.totalImageProgress.toFixed()}%</p>
    </div>
  );
}

export default Checkmark;
