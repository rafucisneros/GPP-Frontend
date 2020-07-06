import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert2 = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Alert = ({ open, setAlertError, errorMsg, autoHideDuration=10000 }) => {
  const handleCloseAlertError = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertError(false);
  };

  return (
  <Snackbar 
    open={open} 
    autoHideDuration={autoHideDuration} 
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
    <Alert2 onClose={handleCloseAlertError} severity="error">
        {errorMsg}
    </Alert2>
  </Snackbar>
  )
}