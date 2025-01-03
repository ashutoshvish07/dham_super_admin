import { Box, Button, Paper } from '@mui/material'
import AdvertisementForm from 'Forms/AdvertisementForm'
import HotelForm from 'Forms/HotelForm'
import { getAdvertisement } from 'Redux/Slice/advertisementSlice'
import { deleteHotelAsync, getHotelAsync } from 'Redux/Slice/hotelSlice'
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import SearchSection from 'layout/MainLayout/Header/SearchSection'
import { debounce } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DataTable from 'ui-component/DataTable/DataTable'

const Advertisement = () => {
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { advertisements, loading, error } = useSelector(state => state.advertisement);

    const [dialogProps, setDialogProps] = useState({
        open: false,
        onClose: () => setDialogProps({ ...dialogProps, open: false }),
    });
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    useEffect(() => {
        dispatch(getAdvertisement({ page: 1, page_size: 10 }));
    }, [dispatch]);


    const addState = () => {
        navigate("/advertisement/create")
    }

    const editHotle = (id) => {
        navigate(`/advertisement/update/${id}`)
    }

    const deleteState = (id) => {
        dispatch(deleteHotelAsync({ id: id })).then(() => {
            dispatch(getAdvertisement({ page: 1, page_size: 10 }));
        })
    }

    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
        },
        {
            field: 'description',
            headerName: 'Description ',
            flex: 2,
        },
        {
            field: 'offerOnItem',
            headerName: 'Offer On Item',
            flex: 1,

        },
        {
            field: 'discountPercentage',
            headerName: 'Discount Percentage',
            flex: 1,
            renderCell: (params) => {
                return (`${params?.value}%`)
            },

        },
        {
            field: 'createdBy',
            headerName: 'Created By',
            flex: 1,
            renderCell: (params) => {
                return (`${params?.value?.name}`)
            },

        },
        {
            field: 'validFrom',
            headerName: 'Start Date',
            flex: 1,
            renderCell: (params) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
        },
        {
            field: 'validUpto',
            headerName: 'End Date',
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
            dispatch(getAdvertisement({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getAdvertisement({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }

    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getAdvertisement({ page: paginationModel.page + 1, page_size: paginationModel?.pageSize, search: value }));
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
                    Advertisement
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={advertisements?.advertisements}
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
                    rowCount={advertisements?.count}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </>
    )
}

export default Advertisement