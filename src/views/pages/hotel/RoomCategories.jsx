import { Box, Button, Paper } from '@mui/material'
import HotelCategoriesForm from 'Forms/HotelCategoriesForm'
import { deleteRoomCateAsync, getRoomCateAsync } from 'Redux/Slice/hotelSlice'
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'ui-component/DataTable/DataTable'

const RoomCategories = () => {
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
    const { roomCategories, loading, error } = useSelector(state => state.hotel);


    useEffect(() => {
        dispatch(getRoomCateAsync());
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
            dispatch(getRoomCateAsync());
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