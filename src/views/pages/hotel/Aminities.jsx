import { Box, Button, Paper } from '@mui/material';
import AmenitiesForm from 'Forms/AmenitiesForm';
import { deleteAmenitiesAsync, getAmenitiesAsync } from 'Redux/Slice/hotelSlice';
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction';
import AlertDialog from 'components/Dialog/Dialog';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import { debounce } from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
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
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const { amenities, loading, error } = useSelector(state => state.hotel);

    useEffect(() => {
        dispatch(getAmenitiesAsync({ page: 1, page_size: 10 }));
    }, [dispatch]);

    const addAmenities = () => {
        setDialogTitle("Add Amenities");
        setDialogContent(<AmenitiesForm dialogProps={dialogProps} />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const editAmenities = (id) => {
        const aminity_data = amenities?.data.find(el => el._id === id)
        setDialogTitle("Update Amenities");
        setDialogContent(<AmenitiesForm dialogProps={dialogProps} aminity_data={aminity_data} type="edit" />);
        setDialogProps({ ...dialogProps, open: true });
    }

    const deleteState = (id) => {
        dispatch(deleteAmenitiesAsync({ id: id })).then(() => {
            dispatch(getAmenitiesAsync({ page: 1, page_size: 10 }));
        })
    }

    const columns = [
        {
            field: 'file',
            headerName: "Media",
            width: 200,
            renderCell: (params) => {
                return <img alt={params?.value?.Bucket} src={params?.value?.Url} height={50} width={50} style={{ objectFit: 'contain' }} />

            },
        },

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
            dispatch(getAmenitiesAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getAmenitiesAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }
    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getAmenitiesAsync({ page: paginationModel.page + 1, page_size: paginationModel?.pageSize, search: value }));
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
                    rowCount={amenities?.count}
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