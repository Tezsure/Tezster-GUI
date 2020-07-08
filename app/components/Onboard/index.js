/* eslint-disable no-script-url */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SidebarIcon from './SidebarIcon';

const { shell } = require('electron');

function Onboard() {
  return (
    <div className="main-container">
      <div className="workplace-container">
        <div className="logo-container">
          <span className="logo-icon"> </span>
        </div>
        <div className="description-container">
          <div className="workplace-header">
            <b>Welcome to Tezster-GUI</b>
          </div>
          <p className="workplace-description">
            A desktop app to interact & deploy smart contracts with tezos
            testnet nodes either running on locally or remotely
          </p>
        </div>
        <div className="workplace-button-container">
          <Link
            to="/workspace"
            className="btn btn-success btn-lg
                          quick-start-button"
          >
            Enter workspace &nbsp;
            <SidebarIcon />
          </Link>
        </div>
        <div className="workplace-update-container">
          <div className="footer-text">
            To learn about our products &amp; it&rsquo;s feature&rsquo;s
          </div>
          <NavLink
            to="#"
            onClick={() => shell.openExternal('https://docs.tezster.tech/')}
            className="update-link"
          >
            Follow our documentation link
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Onboard;
