import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert2 = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Alert = ({ open, setAlert, message, autoHideDuration=4000, severity="error" }) => {
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert(false);
  };

  return (
  <Snackbar 
    open={open} 
    autoHideDuration={autoHideDuration} 
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    onClose={handleCloseAlert}
  >
    <Alert2 severity={severity}>
        {message}
    </Alert2>
  </Snackbar>
  )
}