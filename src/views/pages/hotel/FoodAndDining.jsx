import { Box, Button, Paper } from '@mui/material'
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction'
import AlertDialog from 'components/Dialog/Dialog'
import FoodAndDiningForm from 'Forms/FoodAndDiningForm'
import PropertyForm from 'Forms/PropertyForm'
import SearchSection from 'layout/MainLayout/Header/SearchSection'
import { debounce } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFoodAndDiningAsync, getAllFoodAndDiningAsync, } from 'Redux/Slice/hotelSlice'
import DataTable from 'ui-component/DataTable/DataTable'

const FoodAndDining = () => {
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

    const dispatch = useDispatch();
    const { foodAndDining, loading, error } = useSelector(state => state.hotel);

    useEffect(() => {
        dispatch(getAllFoodAndDiningAsync({ page: 1, page_size: 10 }));
    }, [dispatch]);

    const addAmenities = () => {
        setDialogTitle("Add Food and Dining");
        setDialogContent(<FoodAndDiningForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editAmenities = (id) => {
        const aminity_data = foodAndDining?.data.find(el => el._id === id)
        setDialogTitle("Update Food and Dining");
        setDialogContent(<FoodAndDiningForm dialogProps={dialogProps} aminity_data={aminity_data} type="edit" />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const deleteState = (id) => {
        dispatch(deleteFoodAndDiningAsync({ id: id })).then(() => {
            dispatch(getAllFoodAndDiningAsync({ page: 1, page_size: 10 }));
        })
    }

    const columns = [

        {
            field: 'name',
            headerName: 'Name ',
            flex: 3,
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
            renderCell: (params) => GetTwoAction(params.value, editAmenities, deleteState)
        },
    ]

    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getAllFoodAndDiningAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getAllFoodAndDiningAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }
    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getAllFoodAndDiningAsync({ page: paginationModel.page + 1, page_size: paginationModel?.pageSize, search: value }));
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
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addAmenities} startIcon={<FaPlus size={14} />} >
                    Food and Dinings
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={foodAndDining.data}
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
                    rowCount={foodAndDining?.data?.length}
                    paginationMode="server"
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </div>
    )
}

export default FoodAndDining