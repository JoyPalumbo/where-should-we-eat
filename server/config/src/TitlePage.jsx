import React from 'react';
import { Button } from '@material-ui/core';

/**
 * Rendered first. Prompts user to create an account.
 */

const Title = (props) => {
  const { handleViewChange } = props;
  return (<div>
    <h1>Welcome to WSWE </h1>
    <h2>Please Create an Account</h2>
    <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleViewChange('profile'); }}>Create an Account</Button>
</div>);
};
export default Title;
