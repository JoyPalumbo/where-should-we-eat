import React from 'react';
import { AppBar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
//! 13:00 https://www.youtube.com/watch?v=xm4LX5fJKZ8  moving these imports to the index file to get them out of the way

const Header = (props) => {
  const { handleViewChange, handleSignOutWithGoogle } = props;
  return (
  <AppBar style={{ background: '#9900cc' }} position="static">
  <Toolbar>
    <IconButton edge="start" className='one' color="inherit" aria-label="menu">
    </IconButton>
    <Typography variant="h6" className='two'>
      Where Should We Eat
    </Typography>
    <Button style={{ background: '#9900cc', color:'white' }} value='home' onClick={() => { handleViewChange('home'); }}>Home</Button>
    {/* <Button color="inherit" value='login' onClick={() => { handleSignInWithGoogle(); }}>Login</Button> */}
    {/* //TODO this could be an update profile button in another life */}
    <Button style={{ background: '#9900cc', color: 'white' }} value='profile' onClick={() => { handleViewChange('userSetting'); }}>Profile</Button>
    <Button style={{ background: '#9900cc', color: 'white' }} value='profile' onClick={() => { handleViewChange('createGroup'); }}>Create Group</Button>
    <Button style={{ background: '#9900cc', color: 'white' }} value='login' onClick={() => { handleSignOutWithGoogle(); }}>LOGOUT</Button>
  </Toolbar>
</AppBar>

  );
};


export default Header;
