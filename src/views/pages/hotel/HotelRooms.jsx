import { Box, Button, Paper } from '@mui/material';
import HotelRoomForm from 'Forms/HotelRoomForm';
import { deleteRoomAsync, getAllRoomsAsync } from 'Redux/Slice/hotelSlice';
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction';
import AlertDialog from 'components/Dialog/Dialog';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import { debounce } from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
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
    const [searchTerm, setSearchTerm] = useState("");


    const dispatch = useDispatch();
    const { rooms, loading, error } = useSelector(state => state.hotel);


    useEffect(() => {
        dispatch(getAllRoomsAsync({ page: 1, page_size: 10 }));
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
        dispatch(deleteRoomAsync({ id: id })).then(() => {
            dispatch(getAllRoomsAsync({ page: 1, page_size: 10 }));
        })
    }
    const columns = [

        {
            field: 'userId',
            headerName: 'Hotel Name ',
            renderCell: (params) => (params.value?.name),
            flex: 1,
        },
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
            dispatch(getAllRoomsAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getAllRoomsAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }

    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getAllRoomsAsync({ page: 1, page_size: 10, search: value }));
        }, 1000),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedDispatch(value);
    };

    return (
        <div>
            <AlertDialog
                title={dialogTitle}
                content={dialogContent}
                dialogProps={dialogProps}
            />
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Box>
                    <SearchSection value={searchTerm} handleSearchChange={handleSearchChange} />
                </Box>
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