import { Button, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { createNearByAsync, getAllCityAsync, getNearByAsync, updateNearByAsync } from 'Redux/Slice/locationSlice';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const NearByForm = (props) => {
    const { dialogProps, near_by_data, edit } = props;
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const { cities, loading } = useSelector((state) => state.location);

    useEffect(() => {
        dispatch(getAllCityAsync({ page: 1, page_size: 10 }));
    }, [])

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };

    const formik = useFormik({
        initialValues: {
            name: near_by_data?.name || "",
            description: near_by_data?.description || "",
            cityId: near_by_data?.cityId?._id || "",
            type: near_by_data?.type || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            cityId: Yup.string().required('Required'),
            type: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            const formData = new FormData();

            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('cityId', values.cityId);
            formData.append('type', values.type);

            if (files) {
                files.map((file) => {
                    formData.append('file', file);
                });
            }
            if (edit === 'edit') {
                dispatch(updateNearByAsync({ formData: formData, id: near_by_data?._id })).then(() => {
                    dispatch(getNearByAsync({ page: 1, page_size: 10 }))
                })
            }
            else {
                dispatch(createNearByAsync(formData)), then(() => {
                    dispatch(getNearByAsync({ page: 1, page_size: 10 }))
                })
            }
            dialogProps?.onClose();

        },
    });

    const keyType = [
        {
            _id: 'top_sights',
            name: 'Top Sights'
        },
        {
            _id: 'restaurants',
            name: 'Restaurants'
        }, {
            _id: 'comunication',
            name: 'Comunication'
        },

    ]
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            color='secondary'
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values?.name}
                            onChange={formik?.handleChange}
                            error={formik.touched?.name && Boolean(formik.errors?.name)}
                            helperText={formik.touched?.name && formik.errors?.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            color='secondary'
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            minRows={2}
                            value={formik.values?.description}
                            onChange={formik.handleChange}
                            error={formik.touched?.description && Boolean(formik.errors?.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)} color='secondary'>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                name="type"
                                value={formik.values?.type}
                                onChange={formik.handleChange}
                                label="Type"
                            >
                                {keyType.map((city) => (
                                    <MenuItem key={city._id} value={city?._id}>
                                        {city?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.cityId && formik.errors.cityId && (
                                <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.cityId}</div>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth error={formik.touched.cityId && Boolean(formik.errors.cityId)} color='secondary'
                        >
                            <InputLabel id="cityId-label">City</InputLabel>
                            <Select
                                labelId="cityId-label"
                                id="cityId"
                                name="cityId"
                                value={formik.values?.cityId}
                                onChange={formik.handleChange}
                                label="City"
                            >
                                {cities?.cities?.map((city) => (
                                    <MenuItem key={city._id} value={city?._id}>
                                        {city?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.cityId && formik.errors.cityId && (
                                <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.cityId}</div>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <ImageUpload files={files} setFiles={handleFileChange} deleteFile={handleDeleteFile} multiple={true} />
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

export default NearByForm