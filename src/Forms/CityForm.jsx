import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { MdClose } from 'react-icons/md';
import { createCityAsync, getAllStateAsync } from 'Redux/Slice/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from 'components/ImageUpload/ImageUpload';




const CityForm = (props) => {

    const [files, setFiles] = useState([]);

    const { states: { states }, } = useSelector(state => state.location);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllStateAsync())

    }, [])

    const formik = useFormik({
        initialValues: {
            state: '',
            city: '',
        },
        validationSchema: Yup.object({
            state: Yup.string().required('State is required'),
            city: Yup.string().required('City name is required'),
        }),
        onSubmit: (values) => {
            const formData = {
                ...values,
                files,
            };
            dispatch(createCityAsync({ name: formData.city, stateId: formData.state, file: formData.files[0] }))
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
                        <FormControl fullWidth error={formik.touched.state && Boolean(formik.errors.state)}>
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
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="city"
                            name="city"
                            label="City Name"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
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