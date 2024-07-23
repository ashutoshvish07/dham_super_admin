import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    TextField,
    Grid,
    Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createHotelAsync, getHotelAsync, updateHotelAsync } from 'Redux/Slice/hotelSlice';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { getAllCityAsync, getAllStateAsync, getCountryBySuperAdminAsync } from 'Redux/Slice/locationSlice';
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';

const HotelForm = ({ type, dialogProps, hotle_data }) => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const { countries, states, cities, loading } = useSelector((state) => state.location);
    console.log("countries", countries, hotle_data)

    useEffect(() => {
        dispatch(getCountryBySuperAdminAsync({ page: 1, page_size: 10 }));
        dispatch(getAllCityAsync({ page: 1, page_size: 10 }));
        dispatch(getAllStateAsync({ page: 1, page_size: 10 }));
    }, [])

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };

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
            price: hotle_data?.price || "",
            offerPrice: hotle_data?.offerPrice || "",
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
            price: Yup.number().required('Required'),
            offerPrice: Yup.number().required('Required'),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("name", values.name)
            formData.append("email", values.email)
            formData.append("mobile", values.mobile)
            formData.append("password", values.password)
            formData.append("address", values.address)
            formData.append("pincode", values.pincode)
            formData.append("price", values.price)
            formData.append("offerPrice", values.offerPrice)
            formData.append("countryId", values?.countryId?._id ? values?.countryId?._id : values?.countryId)
            formData.append("stateId", values?.stateId?._id ? values?.stateId?._id : values?.stateId)
            formData.append("cityId", values?.cityId?._id ? values?.cityId?._id : values?.cityId)


            if (files.length) {
                files.forEach((file, index) => {
                    formData.append(`files[]`, file);
                });
            }

            if (type === "edit") {
                dispatch(updateHotelAsync({ formData, id: hotle_data?._id }));
                dispatch(getHotelAsync({ page: 1, page_size: 10 }))
                dialogProps?.onClose();
            } else {
                dispatch(createHotelAsync(formData));
                dispatch(getHotelAsync({ page: 1, page_size: 10 }))
                dialogProps?.onClose();
            }
        },
    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        color='secondary'
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
                        color='secondary'
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
                        color='secondary'
                        id="mobile"
                        name="mobile"
                        label="Mobile"
                        inputProps={{
                            maxLength: 10,
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }}
                        value={formik.values.mobile}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            formik.setFieldValue('mobile', value);
                        }}
                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                        helperText={formik.touched.mobile && formik.errors.mobile}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        color='secondary'
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
                    <AutoComplete
                        options={countries?.countries || []}
                        label="Select Country"
                        id="country-select"
                        name="countryId"
                        value={
                            type === 'edit' ? countries?.countries?.find(c => c._id === hotle_data?.countryId?._id)?.name : formik.values.countryId
                        }
                        onChange={(newValue) => {
                            formik.setFieldValue('countryId', newValue || '');
                        }}
                        error={formik.touched.countryId && Boolean(formik.errors.countryId)}
                        helperText={formik.touched.countryId && formik.errors.countryId}
                        required
                        optionKey="_id"
                        optionLabel="name"
                        color="secondary"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutoComplete
                        options={states?.states || []}
                        label="Select State"
                        id="state-select"
                        name="stateId"
                        value={
                            type === 'edit' ? states?.states?.find(c => c._id === hotle_data?.stateId?._id)?.name : formik.values.stateId
                        }
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
                <Grid item xs={12} sm={6}>

                    <AutoComplete
                        options={cities?.cities || []}
                        label="Select City"
                        id="city-select"
                        name="cityId"
                        value={
                            type === "edit" ? cities?.cities?.find(c => c._id === hotle_data?.cityId?._id)?.name : formik.values.cityId
                        }
                        onChange={(newValue) => {
                            formik.setFieldValue('cityId', newValue || '');
                        }}
                        error={formik.touched.cityId && Boolean(formik.errors.cityId)}
                        helperText={formik.touched.cityId && formik.errors.cityId}
                        required
                        optionKey="_id"
                        optionLabel="name"
                        color="secondary"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        color='secondary'
                        fullWidth
                        id="pincode"
                        name="pincode"
                        label="Pincode"
                        value={formik.values?.pincode}
                        onChange={formik.handleChange}
                        error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                        helperText={formik.touched.pincode && formik.errors.pincode}
                    />
                </Grid><Grid item xs={12} sm={6}>
                    <TextField
                        color='secondary'
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        value={formik.values?.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        color='secondary'
                        fullWidth
                        id="offerPrice"
                        name="offerPrice"
                        label="Offer Price"
                        value={formik.values?.offerPrice}
                        onChange={formik.handleChange}
                        error={formik.touched.offerPrice && Boolean(formik.errors.offerPrice)}
                        helperText={formik.touched.offerPrice && formik.errors.offerPrice}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        color='secondary'
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
