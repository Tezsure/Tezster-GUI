/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

function index(props) {
  const BlocksData = props.blocks.hasOwnProperty('blockDataResponse')
    ? props.blocks.blockDataResponse
    : [];
  const Blocks = BlocksData.map((elem, index) => {
    return (
      <tr className="table-row" key={elem.hash + index}>
        <td className="table-body-cell">
          <div className="cards-header">
            <h4>GAS USED</h4>
          </div>
          <div className="cards-contents">
            <p className="account-address-content">{elem.gas_used}</p>
          </div>
        </td>
        <td className="table-body-cell">
          <div className="cards-header">
            <h4>GAS LIMIT</h4>
          </div>
          <div className="cards-contents">
            <p className="account-address-content">{elem.gas_limit}</p>
          </div>
        </td>
        <td className="table-body-cell">
          <div className="cards-header">
            <h4>MINED ON</h4>
          </div>
          <div className="cards-contents">
            <p className="account-address-content">{elem.time}</p>
          </div>
        </td>
        <td className="table-body-cell">
          <div className="cards-header">
            <h4>BLOCK HASH</h4>
          </div>
          <div className="cards-contents">
            <p className="account-address-content">{elem.hash}</p>
          </div>
        </td>
        <td className="table-body-cell">
          <div className="cards-header">
            <h4>BLOCK TYPE</h4>
          </div>
          <div className="cards-contents">
            <p className="account-address-content">{elem.type}</p>
          </div>
        </td>
        <td className="table-body-cell">
          <div className="cards-header">
            <h4>BLOCK ID</h4>
          </div>
          <div className="cards-contents">
            <p className="account-address-content">{elem.block}</p>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <div className="accounts-container">
      {props.blocks.hasOwnProperty('gas_used') ? (
        <div className="blocks-table-container">
          <table className="table table-striped table-bordered">
            <tbody>{Blocks}</tbody>
          </table>
        </div>
      ) : (
        <div>No blocks available for the Selected network type </div>
      )}
    </div>
  );
}

export default index;
