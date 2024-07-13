import { Box, Button, Paper } from '@mui/material'
import CityForm from 'Forms/CityForm'
import { getAllCityAsync, getAllStateAsync } from 'Redux/Slice/locationSlice'
import AlertDialog from 'components/Dialog/Dialog'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'ui-component/DataTable/DataTable'

const City = () => {

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
    const { cities, loading, error } = useSelector(state => state.location);
    const { states, } = useSelector(state => state.location);


    useEffect(() => {
        dispatch(getAllCityAsync());
    }, [dispatch]);

    const addCountry = () => {
        setDialogTitle("Add City");
        setDialogContent(<CityForm dialogProps={dialogProps} state={states?.states} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const columns = [

        {
            field: 'file',
            headerName: "Media",
            width: 200,
            renderCell: (params) => {
                return <img alt={params?.value?.Bucket} src={params?.value?.Url} height={140} width={80} />

            },
        },
        {
            field: 'name',
            headerName: 'City name',
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
        <div>
            <AlertDialog
                title={dialogTitle}
                content={dialogContent}
                dialogProps={dialogProps}
            />
            <Box sx={{ display: 'flex', justifyContent: "flex-end", marginBottom: 2 }}>
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addCountry} startIcon={<FaPlus size={14} />} >
                    City
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={cities?.cities}
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
                    // rowCount={states?.states?.length}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </div>
    )
}

export default City