import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomSnackBar = (props) => {

    const [open, setOpen] = useState(props.open || false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props?.message}
                </Alert>
            </Snackbar>
        </div >
    )
}

export default CustomSnackBar