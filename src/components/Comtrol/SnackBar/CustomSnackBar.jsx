import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

const CustomSnackBar = ({ message, severity, duration = 3000, open, onClose }) => {

    const [isOpen, setIsOpen] = useState(open);

    // Handle automatic close after duration
    useEffect(() => {
        if (open) {
            setIsOpen(true);
        }
    }, [open]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
        if (onClose) onClose();
    };

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={duration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={severity} variant="filled">
                <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackBar