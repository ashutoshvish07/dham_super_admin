import { Box, Button, Paper } from '@mui/material'
import StateForm from 'Forms/StateForm'
import { deleteStateAsync, getAllStateAsync } from 'Redux/Slice/locationSlice'
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'ui-component/DataTable/DataTable'

const State = (props) => {
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState(null);
    const [dialogProps, setDialogProps] = useState({
        open: false,
        onClose: () => setDialogProps({ ...dialogProps, open: false }),
    });
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const dispatch = useDispatch();
    const { states, loading, error } = useSelector(state => state.location);

    useEffect(() => {
        dispatch(getAllStateAsync({ page: 1, page_size: 10 }));
    }, [dispatch]);

    const addState = () => {
        setDialogTitle("Add State");
        setDialogContent(<StateForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editState = (id) => {
        const state_data = states?.states.find(el => el._id === id)
        setDialogTitle("Update State");
        setDialogContent(<StateForm dialogProps={dialogProps} statedata={state_data} type="edit" />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const deleteState = (id) => {
        dispatch(deleteStateAsync({ state_id: id }));
        dispatch(getAllStateAsync({ page: 1, page_size: 10 }));
    }




    const columns = [
        {
            field: 'name',
            headerName: 'State name',
            flex: 2,
        },
        {
            field: 'createdAt',
            headerName: 'Added Date',
            flex: 2,
            renderCell: (params) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
        },
        {
            field: '_id',
            headerName: 'Action',
            flex: 2,
            renderCell: (params) => GetTwoAction(params.value, editState, deleteState)
        },
    ]

    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getCountryBySuperAdminAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getCountryBySuperAdminAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }
    return (
        <>
            <AlertDialog
                title={dialogTitle}
                content={dialogContent}
                dialogProps={dialogProps}
            />
            <Box sx={{ display: 'flex', justifyContent: "flex-end", marginBottom: 2 }}>
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addState} startIcon={<FaPlus size={14} />} >
                    State
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={states?.states}
                    columns={columns}
                    getRowId={(row) => row._id}
                    loading={loading}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    rowCount={states?.states?.length}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </>
    )
}

export default State