import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { MdClose } from 'react-icons/md';
import { createCityAsync, getAllStateAsync } from 'Redux/Slice/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';




const CityForm = (props) => {

    const [files, setFiles] = useState([]);

    const { states: { states }, } = useSelector(state => state.location);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllStateAsync())

    }, [])

    const formik = useFormik({
        initialValues: {
            stateId: '',
            name: '',
        },
        onSubmit: (values) => {
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("stateId", values?.stateId?._id)


            if (files) {
                files.map((file) => {
                    formData.append('file', file);
                });
            }


            dispatch(createCityAsync(formData))
            dispatch(getAllCityAsync())
            // Perform submission logic here
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
                        {/* <FormControl fullWidth error={formik.touched.state && Boolean(formik.errors.state)}>
                            <InputLabel id="state-select-label">Select State</InputLabel>
                            <Select
                                labelId="state-select-label"
                                id="state-select"
                                value={formik.values.state}
                                onChange={formik.handleChange('state')}
                                label="Select State"
                            >
                                {states?.map((state) => (
                                    <MenuItem key={state._id} value={state?._id}>
                                        {state?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.state && formik.errors.state && (
                                <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.state}</div>
                            )}
                        </FormControl> */}
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