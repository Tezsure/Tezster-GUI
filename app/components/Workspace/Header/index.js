/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.searchTransaction = this.searchTransaction.bind(this);
  }

  searchTransaction(event) {
    if (event.target.value !== '') {
      if (this.props.currentTab !== 'blocks') {
        this.props.handleTabChangeAction('blocks');
      }
      this.props.searchBlocksAction({
        ...this.props,
        SearchText: event.target.value,
      });
    } else {
      this.props.getBlockHeadsAction({ ...this.props });
    }
  }

  render() {
    return (
      <header className="app-header">
        <div className="top-bar">
          <div className="siderbar-icon-container">
            <span
              className="hamburger-icon"
              onClick={() =>
                this.props.sidebarToggleAction(this.props.sidebarToggleState)
              }
            />
          </div>
          <div className="siderbar-logo-container">
            <span className="logo-icon" />
          </div>
          <div className="search-bar-container">
            <div className="input-group">
              <input
                type="text"
                name="searchText"
                className="form-control search-bar"
                value={this.props.searchText}
                onChange={(event) => this.searchTransaction(event)}
                placeholder="Search for block numbers, block id, public key hash, account hash etc."
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

Header.protoTypes = {
  sidebarToggleAction: PropTypes.func,
  sidebarToggleState: PropTypes.bool,
};
