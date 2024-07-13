import { Box, Button, Paper } from '@mui/material';
import HotelRoomForm from 'Forms/HotelRoomForm';
import { getAllRoomsAsync } from 'Redux/Slice/hotelSlice';
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction';
import AlertDialog from 'components/Dialog/Dialog';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'ui-component/DataTable/DataTable';

const HotelRooms = () => {
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
    const { rooms, loading, error } = useSelector(state => state.hotel);


    useEffect(() => {
        dispatch(getAllRoomsAsync());
    }, [dispatch]);

    const addRooms = () => {
        setDialogTitle("Add Rooms");
        setDialogContent(<HotelRoomForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editRooms = (id) => {
        const room_data = rooms?.rooms.find(el => el._id === id)
        setDialogTitle("Update Rooms");
        setDialogContent(<HotelRoomForm dialogProps={dialogProps} room_data={room_data} type="edit" />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const deleteRooms = (id) => {
        // dispatch(deleteStateAsync({ state_id: id }));
        // dispatch(getAllStateAsync({ page: 1, page_size: 10 }));
    }
    const columns = [

        {
            field: 'area',
            headerName: 'Room Size ',
            flex: 1,
        },
        {
            field: 'bedSize',
            headerName: 'Bed Size ',
            flex: 1,
        },
        {
            field: 'price',
            headerName: 'Price ',
            flex: 1,
        },
        {
            field: 'offerPrice',
            headerName: 'OfferPrice ',
            flex: 1,
        },
        {
            field: 'totalNoOfRooms',
            headerName: 'Number Of Rooms ',
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
            field: 'roomCategoryId',
            headerName: 'Room Category',
            flex: 1,
            renderCell: (params) => params.value.name,
        },
        {
            field: '_id',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => GetTwoAction(params.value, editRooms, deleteRooms)
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
        <div>
            <AlertDialog
                title={dialogTitle}
                content={dialogContent}
                dialogProps={dialogProps}
            />
            <Box sx={{ display: 'flex', justifyContent: "flex-end", marginBottom: 2 }}>
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addRooms} startIcon={<FaPlus size={14} />} >
                    Rooms
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={rooms?.rooms}
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
                    rowCount={rooms?.rooms?.length}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </div>
    )
}

export default HotelRooms