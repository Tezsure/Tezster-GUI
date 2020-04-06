/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

function index(props) {
  return (
    <div className="blocks-container">
      {props.blocks.hasOwnProperty('gas_used') ? (
        <span>
          <div className="blocks-cards-container" style={{ display: 'flex' }}>
            <div className="cards">
              <div className="cards-header">
                <h4>GAS USED</h4>
              </div>
              <div className="cards-contents">
                <p>{props.blocks.gas_used}</p>
              </div>
            </div>
            <div className="cards">
              <div className="cards-header">
                <h4>GAS LIMIT</h4>
              </div>
              <div className="cards-contents">
                <p>{props.blocks.gas_limit}</p>
              </div>
            </div>
            <div className="cards">
              <div className="cards-header">
                <h4>MINED ON</h4>
              </div>
              <div className="cards-contents">
                <p>{props.blocks.time}</p>
              </div>
            </div>
            <div className="cards">
              <div className="cards-header">
                <h4>BLOCK HASH</h4>
              </div>
              <div className="cards-contents">
                <p>{props.blocks.hash}</p>
              </div>
            </div>
          </div>
          <div
            className="blocks-cards-container"
            style={
              props.blockAccordionIndex === 2
                ? { display: 'flex' }
                : { display: 'none' }
            }
          >
            <div className="cards">
              <div className="cards-header">
                <h4>GAS USED</h4>
              </div>
              <div className="cards-contents">
                <p>0</p>
              </div>
            </div>
            <div className="cards">
              <div className="cards-header">
                <h4>GAS LIMIT</h4>
              </div>
              <div className="cards-contents">
                <p>6721975</p>
              </div>
            </div>
            <div className="cards">
              <div className="cards-header">
                <h4>MINED ON</h4>
              </div>
              <div className="cards-contents">
                <p>2012-04-12 12:24:00</p>
              </div>
            </div>
            <div className="cards">
              <div className="cards-header">
                <h4>BLOCK HASH</h4>
              </div>
              <div className="cards-contents">
                <p>098UFQEUIF7R237RQUHF89Q3YKLSJC89WY478RYKDFN89R46TR83RKL</p>
              </div>
            </div>
          </div>{' '}
        </span>
      ) : (
        <div>No blocks available for the Selected network type </div>
      )}
    </div>
  );
}

export default index;
