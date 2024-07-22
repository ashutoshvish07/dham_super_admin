import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Box,
    Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCityAsync, } from 'Redux/Slice/locationSlice';
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { createGuidAsync, getGuidAsync, updateGuidAsync } from 'Redux/Slice/guidSlice';


const GuidForm = (props) => {

    const { dialogProps, guid_data, edit } = props;
    const [files, setFiles] = useState([]);

    const { cities: { cities }, } = useSelector(state => state.location);

    console.log("guid_data", guid_data, cities)
    console.log(cities?.find(c => c._id === guid_data?.cityId?._id))

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllCityAsync())
    }, [])

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };



    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        mobile: Yup.string().matches(/^\d{10}$/, 'Must be a valid 10-digit mobile number').required('Required'),
        pincode: Yup.string().matches(/^\d{6}$/, 'Must be a valid 6-digit pincode').required('Required'),
        address: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            name: guid_data?.name || '',
            email: guid_data?.email || '',
            password: '',
            mobile: guid_data?.mobile || '',
            pincode: guid_data?.pincode || '',
            address: guid_data?.address || '',
            cityId: guid_data?.cityId?._id || '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("email", values.email)
            formData.append("cityId", values?.cityId?._id ? values?.cityId?._id : values?.cityId)
            formData.append("mobile", values.mobile)
            formData.append("password", values.password)
            formData.append("address", values.address)
            formData.append("pincode", values.pincode)

            if (files) {
                files.map((file) => {
                    formData.append('file', file);
                });
            }

            if (edit) {
                dispatch(updateGuidAsync({ formData: formData, id: guid_data?._id, })).then(() => {
                    dispatch(getGuidAsync({ page: 1, page_size: 10 }))
                })
            }
            else {
                dispatch(createGuidAsync(formData)).then(() => {
                    dispatch(getGuidAsync({ page: 1, page_size: 10 }))
                })
            }
            dialogProps.onClose()

        },
    });
    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            color='secondary'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            color='secondary'
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            color='secondary'
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
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
                            id="pincode"
                            name="pincode"
                            label="Pincode"
                            color='secondary'
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={formik.touched.pincode && formik.errors.pincode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            color='secondary'
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AutoComplete
                            options={cities || []}
                            label="Select City"
                            id="state-city"
                            name="cityId"
                            value={edit ? cities?.find(c => c._id === guid_data?.cityId?._id)?.name : formik?.values?.cityId}
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
                    <Grid item xs={12} >
                        <ImageUpload label="Upload Your Images" files={files} setFiles={handleFileChange} deleteFile={handleDeleteFile} multiple={false} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }} >
                        <Button color='secondary'
                            variant="outlined" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default GuidForm