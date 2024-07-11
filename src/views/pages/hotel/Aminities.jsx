import { Box, Button, Paper } from '@mui/material';
import AmenitiesForm from 'Forms/AmenitiesForm';
import { getAmenitiesAsync } from 'Redux/Slice/hotelSlice';
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction';
import AlertDialog from 'components/Dialog/Dialog';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'ui-component/DataTable/DataTable';

const Aminities = () => {
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
    const { amenities, loading, error } = useSelector(state => state.hotel);

    console.log("amenities", amenities)
    useEffect(() => {
        dispatch(getAmenitiesAsync());
    }, [dispatch]);

    const addAmenities = () => {
        setDialogTitle("Add Amenities");
        setDialogContent(<AmenitiesForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editAmenities = (id) => {
        // const state_data = states?.states.find(el => el._id === id)
        setDialogTitle("Update Amenities");
        // setDialogContent(<StateForm dialogProps={dialogProps} statedata={state_data} type="edit" />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const deleteState = (id) => {

    }
    const columns = [

        {
            field: 'name',
            headerName: 'Aminities ',
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
            renderCell: (params) => GetTwoAction(params.value, editAmenities, deleteState)
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
                <Button sx={{ borderRadius: 2 }} variant='outlined' color='secondary' size='large' onClick={addAmenities} startIcon={<FaPlus size={14} />} >
                    Amenities
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={amenities.data}
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

export default Aminities