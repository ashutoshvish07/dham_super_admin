import { Box, Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper } from '@mui/material';
import { deleteCountryAsync, getCountryBySuperAdminAsync } from 'Redux/Slice/locationSlice';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'ui-component/DataTable/DataTable';
import Loader from 'ui-component/Loader';
import { FaPlus } from "react-icons/fa";
import AlertDialog from 'components/Dialog/Dialog';
import CountryForm from 'Forms/CountryForm';
import { TfiMoreAlt } from "react-icons/tfi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction';

const Country = () => {
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
    const { countries, loading, error } = useSelector(state => state.location);

    useEffect(() => {
        dispatch(getCountryBySuperAdminAsync({ page: 1, page_size: 10 }));
    }, [dispatch]);


    const addCountry = () => {
        setDialogTitle("Add Country");
        setDialogContent(<CountryForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editCountry = (id) => {
        const country_data = countries?.countries.find(el => el._id === id)
        setDialogTitle("Edit Country");
        setDialogContent(<CountryForm dialogProps={dialogProps} countrydata={country_data} type="edit" />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const deleteCountry = (id) => {
        dispatch(deleteCountryAsync({ id: id }));
        dispatch(getCountryBySuperAdminAsync({ page: 1, page_size: 10 }));
    }



    const columns = [
        {
            field: 'name',
            headerName: 'Country name',
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
            renderCell: (params) => GetTwoAction(params.value, editCountry, deleteCountry),
        }
    ]

    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getCountryBySuperAdminAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getCountryBySuperAdminAsync({ page: e.page, page_size: e.pageSize }));
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
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addCountry} startIcon={<FaPlus size={14} />} >
                    Country
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={countries?.countries}
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
                    rowCount={countries?.count}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </>
    )
}

export default Country