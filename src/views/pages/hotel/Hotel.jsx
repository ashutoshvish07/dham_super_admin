import { Box, Button, Paper } from '@mui/material'
import HotelForm from 'Forms/HotelForm'
import { getHotelAsync } from 'Redux/Slice/hotelSlice'
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'ui-component/DataTable/DataTable'

const Hotel = () => {

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
    const { hotels, loading, error } = useSelector(state => state.hotel);

    useEffect(() => {
        dispatch(getHotelAsync());
    }, [dispatch]);

    const addState = () => {
        setDialogTitle("Add Hotle");
        setDialogContent(<HotelForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editHotle = (id) => {
        const hotle_data = hotels?.hotels.find(el => el._id === id)
        setDialogTitle("Update Hotel");
        setDialogContent(<HotelForm dialogProps={dialogProps} hotle_data={hotle_data} type="edit" />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const deleteState = (id) => {
        // dispatch(deleteStateAsync({ state_id: id }));
        // dispatch(getAllStateAsync({ page: 1, page_size: 10 }));
    }


    const columns = [
        {
            field: 'hotelName',
            headerName: 'Hotel name',
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
            field: 'stateId',
            headerName: 'State ',
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
            renderCell: (params) => GetTwoAction(params.value, editHotle, deleteState)
        },
    ]

    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            // dispatch(getCountryBySuperAdminAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            // dispatch(getCountryBySuperAdminAsync({ page: e.page, page_size: e.pageSize }));
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
                    Hotles
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={hotels?.hotels}
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
                    rowCount={hotels?.hotels?.length}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </>
    )
}

export default Hotel