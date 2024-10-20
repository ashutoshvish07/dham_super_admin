import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

import { MdClose } from 'react-icons/md';
import { createCityAsync, getAllCityAsync, getAllStateAsync, updateCityAsync } from 'Redux/Slice/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';
import Loader from 'ui-component/Loader';




const CityForm = (props) => {

    const { cities_data, dialogProps, type } = props
    const [files, setFiles] = useState([cities_data?.file] || []);
    const { states: { states }, } = useSelector(state => state.location);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        dispatch(getAllStateAsync())

    }, [])
    const formik = useFormik({
        initialValues: {
            stateId: cities_data?.stateId || '',
            name: cities_data?.name || '',
        },
        onSubmit: (values) => {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("stateId", values?.stateId?._id)


            if (files) {
                files.map((file) => {
                    formData.append('file', file);
                });
            }
            if (type === 'edit') {
                dispatch(updateCityAsync({ city_id: cities_data?.id, formData: formData })).then(() => {
                    dispatch(getAllCityAsync({ page: 1, page_size: 10 }))
                    dialogProps?.onClose()
                    setLoading(false)
                })
            }
            else {
                dispatch(createCityAsync(formData)).then(() => {
                    dispatch(getAllCityAsync({ page: 1, page_size: 10 }))
                    dialogProps?.onClose()
                    setLoading(false)
                })
            }
        },
    });


    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };

    return (
        <div>
            {loading && <Loader />}
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <AutoComplete
                            options={states || []}
                            label="Select State"
                            id="state-select"
                            name="stateId"
                            value={formik.values.stateId}
                            onChange={(newValue) => {
                                formik.setFieldValue('stateId', newValue || '');
                            }}
                            error={formik.touched.stateId && Boolean(formik.errors.stateId)}
                            helperText={formik.touched.stateId && formik.errors.stateId}
                            required
                            optionKey="_id"
                            optionLabel="name"
                            color="secondary"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="City Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ImageUpload label="Upload Your Images" files={files} setFiles={handleFileChange} deleteFile={handleDeleteFile} />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button type="submit" variant="outlined" color="secondary" size="medium">
                        Submit
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default CityForm