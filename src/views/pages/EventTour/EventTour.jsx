import { Box, Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import VisibilityIcon from "@mui/icons-material/Visibility";

import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import SearchBar from 'components/SearchBar/SearchBar'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash';
import DataTable from 'ui-component/DataTable/DataTable'
import { deleteeventTourAsync, geteventTourAsync } from 'Redux/Slice/eventTourSlice'
import EventTourForm from 'Forms/EventTourForm'
import { useNavigate, useNavigation } from 'react-router-dom'

const EventTour = () => {
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

    const navigate = useNavigate()



    const { eventTour, loading, status, error } = useSelector((state) => state?.eventTour)
    console.log("event", eventTour)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(geteventTourAsync({ page: 1, page_size: 10 }))
    }, [dispatch])

    const addnearBY = () => {
        navigate("/event-tours/create")
    }

    const editNearBy = (id) => {
        navigate(`/event-tours/edit/${id}`)
    }



    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(geteventTourAsync({ page: e.page + 1, page_size: e.pageSize }))

            setPaginationModel(e)
        } else {
            dispatch(geteventTourAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }


    const deleteEvent = (id) => {
        dispatch(deleteeventTourAsync({ id: id })).then(() => {
            dispatch(geteventTourAsync({ page: paginationModel.page, page_size: paginationModel.pageSize }))
        })
    }

    const handlePreview = (cost) => {
        debugger
        setDialogTitle("Preview")
        setDialogContent(
            <TableContainer>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Package</TableCell>
                            <TableCell>Cost</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cost && cost.length > 0 ? (
                            cost.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.package}</TableCell>
                                    <TableCell>{row.cost}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    No data
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
        )
        setDialogProps({ ...dialogProps, open: true })
    }
    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
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
            field: 'description',
            headerName: 'Description',
            flex: 2,

        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 1,

        },
        {
            field: 'packageCost',
            headerName: 'Cost',
            flex: 1,
            renderCell: (params) => (
                <IconButton
                    onClick={() => {
                        handlePreview(params?.value);
                    }}
                >
                    <VisibilityIcon />
                </IconButton>
            ),

        },
        {
            field: 'duration',
            headerName: 'Duration',
            flex: 1,

        },
        {
            field: 'departure_from',
            headerName: 'Departure From',
            flex: 1,

        },
        {
            field: 'departure_time',
            headerName: 'Departure Time',
            flex: 1,
            renderCell: (params) => {
                return moment(params.value, "HH:mm").format("hh:mm A")
            },
        },
        {
            field: 'departure_date',
            headerName: 'Departure Date',
            flex: 1,
            renderCell: (params) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
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
            renderCell: (params) => GetTwoAction(params.value, editNearBy, deleteEvent)
        },
    ]
    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(geteventTourAsync({ page: 1, page_size: 10, search: value }));
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
            <AlertDialog
                title={dialogTitle}
                content={dialogContent}
                dialogProps={dialogProps}
            />
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Box>
                    <SearchBar
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        size='small'
                        color="secondary"
                    />

                </Box>
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addnearBY} startIcon={<FaPlus size={14} />} >
                    Event & Tours
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={eventTour?.allEventsTours}
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
                    rowCount={eventTour?.count}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </div>
    )
}

export default EventTour
