import { Box, Button, Paper } from '@mui/material'
import CityForm from 'Forms/CityForm'
import { deleteCityAsync, getAllCityAsync } from 'Redux/Slice/locationSlice'
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import SearchSection from 'layout/MainLayout/Header/SearchSection'
import { debounce } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'ui-component/DataTable/DataTable'

const City = () => {

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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
        dispatch(getAllCityAsync({ page: 1, page_size: 10 }));
    }, [dispatch]);

    const addCountry = () => {
        setDialogTitle("Add City");
        setDialogContent(<CityForm dialogProps={dialogProps} state={states?.states} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editCity = (id) => {
        const cities_data = cities?.cities.find(el => el.id === id)
        setDialogTitle("Edit City");

        setDialogContent(<CityForm dialogProps={dialogProps} cities_data={cities_data} type="edit" />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const deleteCity = (id) => {
        dispatch(deleteCityAsync({ city_id: id }));
        dispatch(getAllCityAsync({ page: 1, page_size: 10 }));
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
        {
            field: 'id',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => GetTwoAction(params.value, editCity, deleteCity)
        },
    ]

    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getAllCityAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getAllCityAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }

    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getAllCityAsync({ page: paginationModel.page + 1, page_size: paginationModel?.pageSize, search: value }));
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
                    City
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={cities?.cities}
                    columns={columns}
                    loading={loading}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    rowCount={cities?.cities?.length}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    getRowId={(row) => row.id}
                />
            </Paper>
        </div>
    )
}

export default City