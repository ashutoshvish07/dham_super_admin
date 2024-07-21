import { Box, Button, Paper, Typography } from '@mui/material'
import NearByForm from 'Forms/NearByForm'
import { deleteNearByAsync, getNearByAsync } from 'Redux/Slice/locationSlice'
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'ui-component/DataTable/DataTable'

const NearBy = () => {

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

    const { nearBy, loading, status, error } = useSelector((state) => state.location)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNearByAsync({ page: 1, page_size: 10 }))
    }, [dispatch])

    const addnearBY = () => {
        setDialogTitle("Add NearBy Locations");
        setDialogContent(<NearByForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editNearBy = (id) => {
        const near_by_data = nearBy?.nearbies.find(el => el._id === id)
        debugger
        setDialogTitle("Update NearBy Locations");
        setDialogContent(<NearByForm dialogProps={dialogProps} near_by_data={near_by_data} edit="edit" />);
        setDialogProps({ ...dialogProps, open: true });
    }



    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getNearByAsync({ page: e.page + 1, page_size: e.pageSize }))

            setPaginationModel(e)
        } else {
            dispatch(getNearByAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }


    const deleteNearBy = (id) => {
        dispatch(deleteNearByAsync({ id: id }));
    }
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'cityId',
            headerName: 'City ',
            flex: 1,
            renderCell: (params) => {
                return (params?.value?.name)
            },
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 2,

        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 1,

        },
        {
            field: 'createdAt',
            headerName: 'Added Date',
            flex: 1,
            renderCell: (params) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
        },
        {
            field: '_id',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => GetTwoAction(params.value, editNearBy, deleteNearBy)
        },
    ]




    return (
        <div>
            <AlertDialog
                title={dialogTitle}
                content={dialogContent}
                dialogProps={dialogProps}
            />
            <Typography variant='h3'>
                NearBy Page
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: "flex-end", marginBottom: 2 }}>
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addnearBY} startIcon={<FaPlus size={14} />} >
                    Near by
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={nearBy?.nearbies}
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
                    rowCount={nearBy?.count}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </div>
    )
}

export default NearBy