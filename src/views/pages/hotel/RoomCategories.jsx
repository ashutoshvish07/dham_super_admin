import { Box, Button, Paper } from '@mui/material'
import HotelCategoriesForm from 'Forms/HotelCategoriesForm'
import { deleteRoomCateAsync, getRoomCateAsync } from 'Redux/Slice/hotelSlice'
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import SearchSection from 'layout/MainLayout/Header/SearchSection'
import { debounce } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'ui-component/DataTable/DataTable'

const RoomCategories = () => {
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const { roomCategories, loading, error } = useSelector(state => state.hotel);
    const [dialogProps, setDialogProps] = useState({
        open: false,
        onClose: () => setDialogProps({ ...dialogProps, open: false }),
    });
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });


    useEffect(() => {
        dispatch(getRoomCateAsync({ page: 1, page_size: 10 }));
    }, [dispatch]);

    const addCountry = () => {
        setDialogTitle("Add RoomCategory");
        setDialogContent(<HotelCategoriesForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editCate = (id) => {
        const state_data = roomCategories?.categories.find(el => el._id === id)
        setDialogTitle("Update RoomCategory");
        setDialogContent(<HotelCategoriesForm dialogProps={dialogProps} catdata={state_data} type="edit" />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const deleteCat = (id) => {
        dispatch(deleteRoomCateAsync({ id: id })).then(() => {
            dispatch(getRoomCateAsync({ page: 1, page_size: 10 }));
        })
    }
    const columns = [

        {
            field: 'name',
            headerName: 'Categorie ',
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
            renderCell: (params) => GetTwoAction(params.value, editCate, deleteCat)
        },
    ]

    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getRoomCateAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getRoomCateAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }

    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getRoomCateAsync({ page: paginationModel.page + 1, page_size: paginationModel?.pageSize, search: value }));
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
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addCountry} startIcon={<FaPlus size={14} />} >
                    RoomCategory
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={roomCategories?.categories}
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
                    rowCount={roomCategories?.categories?.length}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </div>
    )
}

export default RoomCategories