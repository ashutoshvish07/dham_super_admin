import { Box, Button, Paper } from '@mui/material'
import HotelForm from 'Forms/HotelForm'
import { deleteHotelAsync, getHotelAsync } from 'Redux/Slice/hotelSlice'
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import SearchBar from 'components/SearchBar/SearchBar'
import SearchSection from 'layout/MainLayout/Header/SearchSection'
import { debounce } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DataTable from 'ui-component/DataTable/DataTable'

const Hotel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
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



    const { hotels, loading, error } = useSelector(state => state.hotel);

    useEffect(() => {
        dispatch(getHotelAsync({ page: 1, page_size: 10 }));
    }, [dispatch]);

    const addState = () => {
        navigate("/hotel/hotels/create")
        // setDialogTitle("Add Hotle");
        // setDialogContent(<HotelForm dialogProps={dialogProps} />);
        // setDialogProps({ ...dialogProps, open: true });
    }

    const editHotle = (id) => {
        navigate(`/hotel/hotels/edit/${id}`)
        // const hotle_data = hotels?.hotels.find(el => el._id === id)
        // setDialogTitle("Update Hotel");
        // setDialogContent(<HotelForm dialogProps={dialogProps} hotle_data={hotle_data} type="edit" />);
        // setDialogProps({ ...dialogProps, open: true });
    }

    const deleteState = (id) => {
        dispatch(deleteHotelAsync({ id: id })).then(() => {
            dispatch(getHotelAsync({ page: 1, page_size: 10 }));
        })
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Hotel name',
            flex: 2,
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
            dispatch(getHotelAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getHotelAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }

    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getHotelAsync({ page: 1, page_size: 10, search: value }));
        }, 1000),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedDispatch(value);
    };

    return (
        <>
            <AlertDialog
                title={dialogTitle}
                content={dialogContent}
                dialogProps={dialogProps}
            />
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Box>
                    <SearchSection value={searchTerm} handleSearchChange={handleSearchChange} />
                </Box>
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addState} startIcon={<FaPlus size={14} />} >
                    Hotles
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={hotels?.hotels}
                    columns={columns}
                    getRowId={(row) => row._id ? row._id : row.id}
                    loading={loading}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    rowCount={hotels?.count}
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