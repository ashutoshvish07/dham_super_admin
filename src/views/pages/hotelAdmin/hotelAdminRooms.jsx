import { Box, Button, Paper } from '@mui/material';
import { deleteHotelRoomAsync, getHotelRoomsAsync } from 'Redux/Slice/hotelAdminSlice';
import { deleteRoomAsync, getAllRoomsAsync } from 'Redux/Slice/hotelSlice';
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction';
import AlertDialog from 'components/Dialog/Dialog';
import useUser from 'hooks/useUser';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import { debounce } from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DataTable from 'ui-component/DataTable/DataTable';

const HotelAdminRooms = (props) => {
    const { view } = props;
    const user = useUser()

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
    const navigate = useNavigate()
    const { rooms, loading, error } = useSelector(state => state.hotelAdminRooms);


    useEffect(() => {
        dispatch(getHotelRoomsAsync({ id: user?._id, page: 1, page_size: 10 }));
    }, [dispatch, user?._id]);

    const addRooms = () => {
        // /hotel/rooms / create
        navigate("/rooms/create");
    }

    const editRooms = (id) => {
        navigate(`/rooms/update/${id}`);

    }

    const deleteRooms = (id) => {
        dispatch(deleteHotelRoomAsync({ id: id })).then(() => {
            dispatch(getHotelRoomsAsync({ page: 1, page_size: 10 }));
        })
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

    const dashcolumns = [
        {
            field: 'price',
            headerName: 'Price ',
            flex: 1,
        },
        {
            field: 'area',
            headerName: 'Room Size ',
            flex: 1,
        },
        {
            field: 'offerPrice',
            headerName: 'OfferPrice ',
            flex: 1,
        },
        {
            field: 'totalNoOfRooms',
            headerName: 'Rooms ',
            flex: 1,
        },
    ]

    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getHotelRoomsAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getHotelRoomsAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }

    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getHotelRoomsAsync({ page: 1, page_size: 10, search: value }));
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


            {view != "dashboard" && <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Box>
                    <SearchSection value={searchTerm} handleSearchChange={handleSearchChange} />
                </Box>
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addRooms} startIcon={<FaPlus size={14} />} >
                    Rooms
                </Button>
            </Box>}
            <Paper>
                <DataTable
                    data={rooms?.rooms}
                    columns={view === "dashboard" ? dashcolumns : columns}
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

export default HotelAdminRooms