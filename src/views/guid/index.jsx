import { Box, Button, Paper, Typography } from '@mui/material'
import GuidForm from 'Forms/GuidForm';
import { deleteGuidAsync, getGuidAsync } from 'Redux/Slice/guidSlice';
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction';
import AlertDialog from 'components/Dialog/Dialog';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'ui-component/DataTable/DataTable';

const GuidPage = () => {

    const { guids, loading } = useSelector((state) => state.guid)
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState(null);
    const [dialogProps, setDialogProps] = useState({
        open: false,
        onClose: () => setDialogProps({ ...dialogProps, open: false }),
    });

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getGuidAsync({ page: 1, page_size: 10 }))
    }, [dispatch])

    const addRooms = () => {
        setDialogTitle("Add Guid");
        setDialogContent(<GuidForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }
    const editGuid = (id) => {
        const guid_data = guids?.guids.find(el => el._id === id)

        setDialogTitle("Update Guid");
        setDialogContent(<GuidForm dialogProps={dialogProps} guid_data={guid_data} edit={true} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const deleteGuid = (id) => {
        dispatch(deleteGuidAsync({ id: id })).then(() => {
            dispatch(getGuidAsync({ page: 1, page_size: 10 }))
        })
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
            field: 'address',
            headerName: 'Address',
            flex: 2,

        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,

        },
        {
            field: 'mobile',
            headerName: 'Mobile',
            flex: 1,

        },
        {
            field: 'status',
            headerName: 'Status',
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
            renderCell: (params) => GetTwoAction(params.value, editGuid, deleteGuid)
        },
    ]

    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getGuidAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getGuidAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
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
            <Paper>
                <DataTable
                    data={guids?.guids}
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
                    rowCount={guids?.count}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>


        </div>
    )
}

export default GuidPage