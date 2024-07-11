import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    TextField,
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createHotelAsync, getHotelAsync, updateHotelAsync } from 'Redux/Slice/hotelSlice';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { getAllCityAsync, getAllStateAsync, getCountryBySuperAdminAsync } from 'Redux/Slice/locationSlice';

const HotelForm = ({ type, dialogProps, hotle_data }) => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const { countries, states, cities, loading } = useSelector((state) => state.location);

    useEffect(() => {
        dispatch(getCountryBySuperAdminAsync({ page: 1, page_size: 10 }));
        dispatch(getAllCityAsync());
        dispatch(getAllStateAsync({ page: 1, page_size: 10 }));
    }, [])

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };

    console.log("hotle_data", hotle_data)
    const formik = useFormik({
        initialValues: {
            name: hotle_data?.name || "",
            email: hotle_data?.email || "",
            mobile: hotle_data?.mobile || "",
            password: hotle_data?.password || "",
            countryId: hotle_data?.countryId?._id || "",
            stateId: hotle_data?.stateId?._id || "",
            cityId: hotle_data?.cityId?._id || "",
            address: hotle_data?.address || "",
            pincode: hotle_data?.pincode || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            mobile: Yup.string().required('Required'),
            password: Yup.string(),
            countryId: Yup.string().required('Required'),
            stateId: Yup.string().required('Required'),
            cityId: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
            pincode: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            const formData = new FormData();

            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });


            if (files) {
                // files.map((file) => {
                formData.append('files[]', files);
                // });
            }

            if (type === "edit") {
                dispatch(updateHotelAsync({ formData, id: hotle_data?._id }));
                dispatch(getHotelAsync());
                dialogProps?.onClose();
            } else {
                dispatch(createHotelAsync(formData));
                dispatch(getHotelAsync());
                dialogProps?.onClose();
            }
        },



    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Hotel Name"
                        value={formik.values?.name}
                        onChange={formik?.handleChange}
                        error={formik.touched?.name && Boolean(formik.errors?.name)}
                        helperText={formik.touched?.name && formik.errors?.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values?.email}
                        onChange={formik.handleChange}
                        error={formik.touched?.email && Boolean(formik.errors?.email)}
                        helperText={formik.touched?.email && formik.errors?.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="mobile"
                        name="mobile"
                        label="Mobile"
                        value={formik.values?.mobile}
                        onChange={formik.handleChange}
                        error={formik.touched?.mobile && Boolean(formik.errors?.mobile)}
                        helperText={formik.touched?.mobile && formik.errors.mobile}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values?.password}
                        onChange={formik.handleChange}
                        error={formik.touched?.password && Boolean(formik.errors?.password)}
                        helperText={formik.touched?.password && formik.errors?.password}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={formik.touched.countryId && Boolean(formik.errors.countryId)}>
                        <InputLabel id="countryId-label">Country</InputLabel>
                        <Select
                            labelId="countryId-label"
                            id="countryId"
                            name="countryId"
                            value={formik.values?.countryId}
                            onChange={formik.handleChange}
                            label="Country"
                        >
                            {countries?.countries?.map((country) => (
                                <MenuItem key={country._id} value={country._id}>
                                    {country.name}
                                </MenuItem>
                            )
                            )}
                        </Select>
                        {formik.touched.countryId && formik.errors.countryId && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.countryId}</div>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={formik.touched.stateId && Boolean(formik.errors.stateId)}>
                        <InputLabel id="stateId-label">State</InputLabel>
                        <Select
                            labelId="stateId-label"
                            id="stateId"
                            name="stateId"
                            value={formik.values?.stateId}
                            onChange={formik.handleChange}
                            label="State"
                        >
                            {states?.states?.map((state) => (
                                <MenuItem key={state._id} value={state?._id}>
                                    {state?.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.stateId && formik.errors.stateId && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.stateId}</div>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={formik.touched.cityId && Boolean(formik.errors.cityId)}>
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
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="pincode"
                        name="pincode"
                        label="Pincode"
                        value={formik.values?.pincode}
                        onChange={formik.handleChange}
                        error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                        helperText={formik.touched.pincode && formik.errors.pincode}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="address"
                        name="address"
                        label="Address"
                        value={formik.values?.address}
                        onChange={formik.handleChange}
                        error={formik.touched?.address && Boolean(formik.errors?.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </Grid>

                {/* <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="location"
                        name="location"
                        label="Location"
                        value={formik.values?.location}
                        onChange={formik.handleChange}
                        error={formik.touched?.location && Boolean(formik.errors.location)}
                        helperText={formik.touched.location && formik.errors.location}
                    />
                </Grid> */}
                <Grid item xs={12}>
                    <ImageUpload files={files} setFiles={handleFileChange} deleteFile={handleDeleteFile} />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                <Button type="submit" variant="outlined" color="secondary" size="medium">
                    Submit
                </Button>
            </Box>
        </form>
    );
};

export default HotelForm;
