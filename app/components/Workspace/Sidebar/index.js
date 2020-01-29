/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

function Sidebar(props) {
  return (
    <aside className="container-sidebar">
      <ul className="sidebar-content-container">
        <li
          className={
            props.currentTab === 'accounts'
              ? 'sidebar-content-active'
              : 'sidebar-content'
          }
          onClick={() => props.handleTabChangeAction('accounts')}
        >
          <span
            className={
              props.currentTab === 'accounts'
                ? 'accounts-icon-active'
                : 'accounts-icon'
            }
          />
          <span
            className={
              props.sidebarToggleState
                ? 'sidebar-text'
                : 'sidebar-text-collapsed'
            }
          >
            {' '}
            Accounts
          </span>
        </li>
        <li
          className={
            props.currentTab === 'blocks'
              ? 'sidebar-content-active'
              : 'sidebar-content'
          }
          onClick={() => props.handleTabChangeAction('blocks')}
        >
          <span
            className={
              props.currentTab === 'blocks'
                ? 'blocks-icon-active'
                : 'blocks-icon'
            }
          />
          <span
            className={
              props.sidebarToggleState
                ? 'sidebar-text'
                : 'sidebar-text-collapsed'
            }
          >
            {' '}
            Blocks
          </span>
        </li>
        <li
          className={
            props.currentTab === 'transactions'
              ? 'sidebar-content-active'
              : 'sidebar-content'
          }
          onClick={() => props.handleTabChangeAction('transactions')}
        >
          <span
            className={
              props.currentTab === 'transactions'
                ? 'wallet-icon-active'
                : 'wallet-icon'
            }
          />
          <span
            className={
              props.sidebarToggleState
                ? 'sidebar-text'
                : 'sidebar-text-collapsed'
            }
          >
            {' '}
            Transactions
          </span>
        </li>
        <li
          className={
            props.currentTab === 'contracts'
              ? 'sidebar-content-active'
              : 'sidebar-content'
          }
          onClick={() => props.handleTabChangeAction('contracts')}
        >
          <span
            className={
              props.currentTab === 'contracts'
                ? 'card-icon-active'
                : 'card-icon'
            }
          />
          <span
            className={
              props.sidebarToggleState
                ? 'sidebar-text'
                : 'sidebar-text-collapsed'
            }
          >
            {' '}
            Contracts
          </span>
        </li>
        <li
          className={
            props.currentTab === 'events'
              ? 'sidebar-content-active'
              : 'sidebar-content'
          }
          onClick={() => props.handleTabChangeAction('events')}
        >
          <span
            className={
              props.currentTab === 'events'
                ? 'events-icon-active'
                : 'events-icon'
            }
          />
          <span
            className={
              props.sidebarToggleState
                ? 'sidebar-text'
                : 'sidebar-text-collapsed'
            }
          >
            {' '}
            Events
          </span>
        </li>
        <li
          className={
            props.currentTab === 'logs'
              ? 'sidebar-content-active'
              : 'sidebar-content'
          }
          onClick={() => props.handleTabChangeAction('logs')}
        >
          <span
            className={
              props.currentTab === 'logs' ? 'fill-icon-active' : 'fill-icon'
            }
          />
          <span
            className={
              props.sidebarToggleState
                ? 'sidebar-text'
                : 'sidebar-text-collapsed'
            }
          >
            {' '}
            Logs
          </span>
        </li>
        <li
          className={
            props.currentTab === 'help'
              ? 'sidebar-content-active'
              : 'sidebar-content'
          }
          onClick={() => props.handleTabChangeAction('help')}
        >
          <span
            className={
              props.currentTab === 'help' ? 'email-icon-active' : 'email-icon'
            }
          />
          <span
            className={
              props.sidebarToggleState
                ? 'sidebar-text'
                : 'sidebar-text-collapsed'
            }
          >
            {' '}
            Help Desk
          </span>
        </li>
        <li
          className={
            props.currentTab === 'settings'
              ? 'sidebar-content-active'
              : 'sidebar-content'
          }
          onClick={() => props.handleTabChangeAction('settings')}
        >
          <span
            className={
              props.currentTab === 'settings'
                ? 'settings-icon-active'
                : 'settings-icon'
            }
          />
          <span
            className={
              props.sidebarToggleState
                ? 'sidebar-text'
                : 'sidebar-text-collapsed'
            }
          >
            {' '}
            Settings
          </span>
        </li>
      </ul>
    </aside>
  );
}
Sidebar.protoTypes = {
  sidebarToggleState: PropTypes.bool
};

export default Sidebar;
