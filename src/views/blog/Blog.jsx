import { Box, Button, Paper } from '@mui/material';
import { GetTwoAction } from 'components/Comtrol/Actions/GetToAction';
import AlertDialog from 'components/Dialog/Dialog';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import { debounce } from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getblogsAsync, updateblogsStatusAsync } from 'Redux/Slice/blogSlice';
import DataTable from 'ui-component/DataTable/DataTable';

const Blog = () => {
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

    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector(state => state.blogs);
    console.log("Blogs", blogs, loading, error);

    useEffect(() => {
        dispatch(getblogsAsync({ page: 1, page_size: 10 }));
    }, [dispatch]);

    const addAmenities = () => {
        navigate('/create-blogs')
    }

    const editBlog = (id) => {
        navigate(`/edit-blogs/${id}`)
    }

    const deleteState = (id) => {
        // dispatch(deleteAmenitiesAsync({ id: id })).then(() => {
        //     dispatch(getblogsAsync({ page: 1, page_size: 10 }));
        // })
    }

    const statusUpdate = (id) => {
        dispatch(updateblogsStatusAsync({ id: id, })).then(() => {
            dispatch(getblogsAsync({ page: 1, page_size: 10 }));
        })
    }

    const columns = [
        {
            field: 'title',
            headerName: 'Title ',
            flex: 2,
        }, {
            field: 'tags',
            headerName: 'Tags ',
            flex: 2,
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
            field: 'status',
            headerName: 'Status ',
            flex: 1,
            renderCell: (params) => {
                return (params?.value)
            },
        },
        {
            field: 'createdAt',
            headerName: 'Created Date',
            flex: 1,
            renderCell: (params) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
        },
        {
            field: '_id',
            headerName: 'Action',
            flex: 2,
            renderCell: (params) => GetTwoAction(params.value, editBlog, null, statusUpdate)
        },
    ]

    const onChangeCount = (e) => {
        if (e.pageSize == paginationModel.pageSize) {
            dispatch(getblogsAsync({ page: e.page + 1, page_size: e.pageSize }));
            setPaginationModel(e)
        } else {
            dispatch(getblogsAsync({ page: e.page, page_size: e.pageSize }));
            setPaginationModel({ page: 1, pageSize: e.pageSize })
        }
    }
    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(getblogsAsync({ page: paginationModel.page + 1, page_size: paginationModel?.pageSize, search: value }));
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
                    Blogs
                </Button>
            </Box>
            <Paper>
                <DataTable
                    data={blogs.blogs}
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
                    rowCount={blogs?.count || 0}
                    paginationMode='server'
                    onPaginationModelChange={onChangeCount}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </div>
    )
}

export default Blog