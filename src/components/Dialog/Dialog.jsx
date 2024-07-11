import * as React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { MdClose } from "react-icons/md";


export default function AlertDialog(props) {
    const { content, title, dialogProps, } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        dialogProps.onClose()
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={dialogProps.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                '& .MuiDialog-paper': {
                    minWidth: fullScreen ? '100%' : '400px',
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <Tooltip title='Close'>
                <IconButton sx={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                }}
                    onClick={handleClose}>
                    <MdClose />
                </IconButton>
            </Tooltip>
            <DialogContent>{content}</DialogContent>
        </Dialog>
    );
}
