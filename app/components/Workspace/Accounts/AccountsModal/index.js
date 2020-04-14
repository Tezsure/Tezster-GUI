import React from 'react';
import CreateAccounts from './CreateAccounts';
import RestoreAccounts from './RestoreAccounts';
<<<<<<< HEAD
=======
import ValidateWallet from './ValidateWallet';
>>>>>>> 6ff14c40e42950d9ad12ef638ae9a25ef90863e1

function AccountsModal(props) {
  const modalBody = () => {
    switch (props.showAccountsModal) {
      case 'create-accounts':
        return <CreateAccounts {...props} />;
      case 'restore-accounts':
        return <RestoreAccounts {...props} />;
<<<<<<< HEAD
=======
      case 'validate-wallets':
        return <ValidateWallet {...props} />;
>>>>>>> 6ff14c40e42950d9ad12ef638ae9a25ef90863e1
      default:
        return <div />;
    }
  };
  return (
    <div
      className="modal fade show"
      role="dialog"
      style={{
        display: 'block',
        paddingRight: '15px',
        opacity: 1
      }}
    >
      <div className="modal-dialog" role="document">
        {modalBody()}
      </div>
    </div>
  );
}

export default AccountsModal;
