import React from 'react';
import { AppBar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

/**
 * 
 * this is not currently being used 
 */

const AltHeader = (props) => {
  return (
  <AppBar style={{ background: '#9900cc' }} position="static">
  <Toolbar>
    <IconButton edge="start" className='one' color="inherit" aria-label="menu">
    </IconButton>
    <Typography variant="h6" className='two'>
      Where Should We Eat
    </Typography>
  </Toolbar>
</AppBar>

  );
};


export default AltHeader;
