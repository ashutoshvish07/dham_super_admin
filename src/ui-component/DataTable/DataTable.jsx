import { Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

const DataTable = (props) => {

    const { className, data, rowCount, ...other } = props

    function NoRowsOverlay() {
        return (
            <Stack height="100%" alignItems="center" justifyContent="center">
                No result found
            </Stack>
        );
    }
    return (
        <>
            <DataGrid
                {...other}
                autoHeight={true}
                rowCount={rowCount}
                components={{ ...other.components, NoRowsOverlay: other?.components?.NoRowsOverlay ? other?.components?.NoRowsOverlay : NoRowsOverlay }}
                className={`${className}`}
                rows={data}
                sx={{
                    borderRadius: 4,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        // color: 'primary.main',
                    },
                    '& .MuiDataGrid-root': {
                        borderRadius: 4,
                    }
                }}
            />
        </>
    )
}

export default DataTable