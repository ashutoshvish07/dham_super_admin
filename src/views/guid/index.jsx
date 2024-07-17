import { Box, Button, Typography } from '@mui/material'
import AlertDialog from 'components/Dialog/Dialog';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';

const GuidPage = () => {

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState(null);
    const [dialogProps, setDialogProps] = useState({
        open: false,
        onClose: () => setDialogProps({ ...dialogProps, open: false }),
    });

    const addRooms = () => {
        setDialogTitle("Add Guid");
        // setDialogContent(<HotelRoomForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }
    return (
        <div>
            <AlertDialog
                title={dialogTitle}
                content={dialogContent}
                dialogProps={dialogProps}
            />
            <Typography variant='h3'>
                Guid Page
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: "flex-end", marginBottom: 2 }}>
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addRooms} startIcon={<FaPlus size={14} />} >
                    Guid
                </Button>
            </Box>
        </div>
    )
}

export default GuidPage