import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";

export const GetTwoAction = (id, edit, deletefn) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <Box>
        <IconButton onClick={handleClick}>
            <TfiMoreAlt />
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            getContentAnchorEl={null}
        >
            <MenuItem onClick={() => edit(id)} >
                <ListItemIcon size="small">
                    <FaEdit />
                </ListItemIcon>
                <ListItemText variant="body2" color="text.secondary">Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => deletefn(id)} >
                <ListItemIcon size="small">
                    <RiDeleteBinLine />
                </ListItemIcon>
                <ListItemText variant="body2" color="text.secondary">Edit</ListItemText>
            </MenuItem>
        </Menu>
    </Box>
}