import { Box, Paper, Typography } from '@mui/material'

import SearchBar from 'components/SearchBar/SearchBar'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash';
import DataTable from 'ui-component/DataTable/DataTable'
import { useNavigate } from 'react-router-dom'
import { getBookingsAsync, gethotelBookingsAsync } from 'Redux/Slice/bookingSlice';

const HotelBooking = () => {


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



    const { loading, hotelbooking } = useSelector((state) => state.bookings)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(gethotelBookingsAsync({ page: 1, page_size: 10 }))
    }, [dispatch])

    const addnearBY = () => {
        navigate("/event-tours/create")
    }

    const editNearBy = (id) => {
        navigate(`/event-tours/edit/${id}`)
    }



    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getBookingsAsync({ page: e.page + 1, page_size: e.pageSize }))

            setPaginationModel(e)
        } else {
            dispatch(getBookingsAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }


    // const deleteEvent = (id) => {
    //     dispatch(deleteeventTourAsync({ id: id })).then(() => {
    //         dispatch(getBookingsAsync({ page: paginationModel.page, page_size: paginationModel.pageSize }))
    //     })
    // }

    const columns = [
        {
            field: 'customerFirstName',
            headerName: 'Customer Name',
            renderCell: (param) => {
                const { customerFirstName, customerLastName } = param.row
                return (`${customerFirstName} ${customerLastName}`)
            },
            flex: 1,
        },
        {
            field: 'totalPrice',
            headerName: 'Total amount',
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
                console.log(totalPrice)
                const dueAmount = totalPrice - paidAmount
                return dueAmount

            }
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
            field: 'checkInDate',
            headerName: 'Check In Date',
            flex: 2,
            renderCell: (params) => {
                return moment(params.value).format('DD/MM/YYYY , HH:mm');
            },
        },

        {
            field: 'checkOutDate',
            headerName: 'Check Out Date',
            flex: 2,
            renderCell: (params) => {
                return moment(params.value).format('DD/MM/YYYY, HH:mm');
            },
        },
    ]
    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getBookingsAsync({ page: 1, page_size: 10, search: value }));
        }, 1000),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedDispatch(value);
    };

    return <div>
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
                    Bookings Details
                </Typography>
            </Box>
        </Box>
        <Paper>
            <DataTable
                data={hotelbooking?.bookings}
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
                rowCount={hotelbooking?.count}
                paginationMode="server"
                onPaginationModelChange={onChangeCount}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
            />
        </Paper>
    </div>
}

export default HotelBooking