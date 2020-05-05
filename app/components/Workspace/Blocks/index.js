/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

function index(props) {
  let header = '';
  let BlocksData = props.blocks.hasOwnProperty('blockDataResponse')
    ? props.blocks.blockDataResponse
    : [];
  if (
    props.blockSearch.hasOwnProperty('searchBlockResponse') &&
    props.blockSearch.searchBlockResponse.length > 0
  ) {
    BlocksData = props.blockSearch.searchBlockResponse;
    header = (
      <div className="cards-container">
        <p>
          Showing filtered block data click on show blocks button to display all
          blocks
        </p>
        <div
          className="cards button-card accounts-button-container"
          style={{ width: '40%' }}
        >
          <div className="button-accounts">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                props.handleTabChangeAction('blocks');
                props.getBlockHeadsActions({ ...props });
              }}
            >
              Show All Blocks
            </button>
          </div>
        </div>
      </div>
    );
  }
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
            <p className="account-address-content">{elem.type || 'N/A'}</p>
          </div>
        </td>
        <td className="table-body-cell">
          <div className="cards-header">
            <h4>BLOCK ID</h4>
          </div>
          <div className="cards-contents">
            <p className="account-address-content">{elem.block || 'N/A'}</p>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <div className="accounts-container">
      {props.blocks.hasOwnProperty('gas_used') ? (
        <>
          {header}
          <div className="blocks-table-container">
            <table className="table table-striped table-bordered">
              <tbody>{Blocks}</tbody>
            </table>
          </div>
        </>
      ) : (
        <div>
          {props.dashboardHeader.networkId === 'Localnode'
            ? 'No blocks available for the Selected network type.'
            : 'No blocks found.'}
        </div>
      )}
    </div>
  );
}

export default index;
