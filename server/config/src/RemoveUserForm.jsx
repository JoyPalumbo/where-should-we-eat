import React from 'react';
import Button from '@material-ui/core/Button';

/**
 * Not a currently active component.
 */

const RemoveUserForm = (props) => {
  const { handleViewChange, handleRemoveUserFromGroup, handleNewGroupMember, } = props;
  const clickFunction = () => {
    handleRemoveUserFromGroup();
    handleViewChange('group');
  }
  return (
      <div>
       
          <h1>Remove Group Member By Name </h1>
          <input type='text' onChange={handleNewGroupMember}/>
          <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { clickFunction(); }}>Remove Group Member</Button>
      </div>
  );
};


export default RemoveUserForm;