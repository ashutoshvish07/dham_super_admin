import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

const SnackNotification = (props) => {
    const [open, setOpen] = useState(false || props.open);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div> <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message={props.message}
        /></div>
    )
}

export default SnackNotification