import React, { Component } from 'react';
import DeployContract from './DeployContract';
import CallContract from './CallContract';
import ViewStorageValue from './ViewStorageValue';
import ShowContract from './ShowContract';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const CurrentTab = this.props.selectedContractsTab;
    return (
      <div className="contracts-table-container">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <span
              className={
                CurrentTab === 'deployContract' ? 'nav-link active' : 'nav-link'
              }
              id="home-tab"
              data-toggle="tab"
              role="tab"
              onClick={() =>
                this.props.handleContractsTabChangeAction('deployContract')
              }
            >
              Deploy contract
            </span>
          </li>
          {/* <li className="nav-item">
            <span
              className={
                CurrentTab === 'callContract' ? 'nav-link active' : 'nav-link'
              }
              id="profile-tab"
              data-toggle="tab"
              role="tab"
              onClick={() =>
                this.props.handleContractsTabChangeAction('callContract')
              }
            >
              Call contract
            </span>
          </li>
          <li className="nav-item">
            <span
              className={
                CurrentTab === 'viewStorage' ? 'nav-link active' : 'nav-link'
              }
              id="contact-tab"
              data-toggle="tab"
              role="tab"
              onClick={() =>
                this.props.handleContractsTabChangeAction('viewStorage')
              }
            >
              View storage value
            </span>
          </li>
          <li className="nav-item">
            <span
              className={
                CurrentTab === 'appliedContractHistory'
                  ? 'nav-link active'
                  : 'nav-link'
              }
              id="contact-tab"
              data-toggle="tab"
              role="tab"
              onClick={() =>
                this.props.handleContractsTabChangeAction(
                  'appliedContractHistory'
                )
              }
            >
              Applied contract history
            </span>
          </li>*/}
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className={
              CurrentTab === 'deployContract'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <DeployContract {...this.props} />
          </div>
          {/* <div
            className={
              CurrentTab === 'callContract'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <CallContract {...this.props} />
          </div>
          <div
            className={
              CurrentTab === 'viewStorage'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <ViewStorageValue {...this.props} />
          </div>
          <div
            className={
              CurrentTab === 'appliedContractHistory'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <ShowContract {...this.props} />
          </div>*/}
        </div>
      </div>
    );
  }
}

export default index;
