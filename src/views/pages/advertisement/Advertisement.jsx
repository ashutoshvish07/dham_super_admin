import { Box, Button, Paper } from '@mui/material'
import AdvertisementForm from 'Forms/AdvertisementForm'
import HotelForm from 'Forms/HotelForm'
import { getAdvertisement } from 'Redux/Slice/advertisementSlice'
import { deleteHotelAsync, getHotelAsync } from 'Redux/Slice/hotelSlice'
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'ui-component/DataTable/DataTable'

const Advertisement = () => {
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
    const { advertisements, loading, error } = useSelector(state => state.advertisement);

    useEffect(() => {
        dispatch(getAdvertisement({ page: 1, page_size: 10 }));
    }, [dispatch]);

    const addState = () => {
        setDialogTitle("Add Advertisement");
        setDialogContent(<AdvertisementForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editHotle = (id) => {
        const advertisement_data = advertisements?.advertisements.find(el => el._id === id)
        setDialogTitle("Update Advertisement");
        setDialogContent(<AdvertisementForm dialogProps={dialogProps} advertisement_data={advertisement_data} edit={true} />);
        setDialogProps({ ...dialogProps, open: true });
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
    return (

        <>
            <AlertDialog
                title={dialogTitle}
                content={dialogContent}
                dialogProps={dialogProps}
            />
            <Box sx={{ display: 'flex', justifyContent: "flex-end", marginBottom: 2 }}>
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