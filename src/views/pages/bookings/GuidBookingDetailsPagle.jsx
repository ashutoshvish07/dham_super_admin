import { Box, Paper, Typography } from '@mui/material'

import SearchBar from 'components/SearchBar/SearchBar'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash';
import DataTable from 'ui-component/DataTable/DataTable'
import { useNavigate } from 'react-router-dom'
import { getGuidBookingsAsync } from 'Redux/Slice/bookingSlice';

const GuidBookingDetailsPagle = () => {
    const [dialogProps, setDialogProps] = useState({
        open: false,
        onClose: () => setDialogProps({ ...dialogProps, open: false }),
    });
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate()



    const { loading, bookings, guidBooking } = useSelector((state) => state.bookings)
    console.log("guidBooking", guidBooking);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGuidBookingsAsync({ page: 1, page_size: 10 }))
    }, [dispatch])



    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getGuidBookingsAsync({ page: e.page + 1, page_size: e.pageSize }))

            setPaginationModel(e)
        } else {
            dispatch(getGuidBookingsAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }


    // const deleteEvent = (id) => {
    //     dispatch(deleteeventTourAsync({ id: id })).then(() => {
    //         dispatch(getGuidBookingsAsync({ page: paginationModel.page, page_size: paginationModel.pageSize }))
    //     })
    // }

    const columns = [
        {
            field: 'guideId',
            headerName: 'Guide Name',
            renderCell: (param) => {
                const { guideId, } = param.row
                return (`${guideId?.name} `)
            },
            flex: 1,
        },
        {
            field: 'totalPrice',
            headerName: 'Total amount',
            flex: 1,

        }, {
            field: 'guideIncome',
            headerName: 'Guide Income',
            flex: 1,

        },
        {
            field: 'paidAmount',
            headerName: 'Paid Amount ',
            flex: 1,
        },

        {
            field: '_id',
            headerName: 'Due Amount ',
            flex: 1,
            renderCell: (params) => {
                const { totalPrice, paidAmount } = params.row
                const dueAmount = totalPrice - paidAmount
                return dueAmount

            }
        },
        {
            field: 'perHourPrice',
            headerName: 'Per Hour Price ',
            flex: 1,
        },

        {
            field: 'bookingStatus',
            headerName: 'Booking Status',
            flex: 1,

        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            flex: 1,

        },
        {
            field: 'totalBookingHours',
            headerName: 'Total Booking Hours',
            flex: 1,

        },
        {
            field: 'bookingDate',
            headerName: 'Booking Date',
            flex: 2,
            renderCell: (params) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
        },

        {
            field: 'bookingTimeFrom',
            headerName: 'Booking Time From',
            flex: 2,
            renderCell: (params) => {
                console.log(params.value);
                return moment(params.value, "HH:mm").format("hh:mm A")
            },
        },
        // {
        //     field: '_id',
        //     headerName: 'Action',
        //     flex: 1,
        //     renderCell: (params) => GetTwoAction(params.value, editNearBy, deleteEvent)
        // },
    ]
    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getGuidBookingsAsync({ page: 1, page_size: 10, search: value }));
        }, 1000), // Adjust the debounce delay as needed
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedDispatch(value);
    };

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: "space-between", flexDirection: "row-reverse", alignItems: "center", marginBottom: 2 }}>
                <Box>
                    <SearchBar
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        size='small'
                        color="secondary"
                    />

                </Box>
                <Box sx={{ borderRadius: 2 }}  >
                    <Typography variant='h2' color='secondary' >
                        Guides Bookings Details
                    </Typography>
                </Box>
            </Box>
            <Paper>
                <DataTable
                    data={guidBooking?.bookings}
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
                    rowCount={guidBooking?.count}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </div>
    )
}

export default GuidBookingDetailsPagle