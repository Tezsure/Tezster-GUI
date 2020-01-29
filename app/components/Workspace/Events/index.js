import React from 'react';

function index() {
  return (
    <div className="events-table-container">
      <div className="cards-container">
        <div className="cards">
          <div className="cards-header">
            <h4>Event Name</h4>
          </div>
          <div className="cards-contents">
            <p>Storage Set</p>
          </div>
        </div>
      </div>
      <div className="events-container">
        <table className="table table-bordered">
          <tbody>
            <tr className="table-row">
              <td className="table-body-cell">
                <div className="cards-header">
                  <h4>Contract</h4>
                </div>
                <div className="cards-contents">
                  <p className="account-address-content">Simple Storage</p>
                </div>
              </td>
              <td className="table-body-cell">
                <div className="cards-header">
                  <h4>TX HASH</h4>
                </div>
                <div className="cards-contents">
                  <p className="account-address-content">
                    0jkdhwio3789652332897asjhas732askjhc89yekqj2
                  </p>
                </div>
              </td>
              <td className="table-body-cell">
                <div className="cards-header">
                  <h4>LOG INDEX</h4>
                </div>
                <div className="cards-contents">
                  <p className="account-address-content">0</p>
                </div>
              </td>
              <td className="table-body-cell">
                <div className="cards-header">
                  <h4>BLOCK TIME</h4>
                </div>
                <div className="cards-contents">
                  <p className="account-address-content">2012-04-01 14:04:12</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default index;
