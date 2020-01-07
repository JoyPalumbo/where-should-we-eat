import React from 'react';

import Button from '@material-ui/core/Button';

/**
 * Not a currently active component?
 */

const SignIn = (props) => {
  const { handleSignInWithGoogle } = props;

  return (
        <Button style={{ background: '#9900cc', color: 'white' }} onClick={handleSignInWithGoogle} >Sign In With Google</Button>

  );
};

export default SignIn;
