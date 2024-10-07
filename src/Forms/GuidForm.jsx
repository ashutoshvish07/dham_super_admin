import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Box,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCityAsync, } from 'Redux/Slice/locationSlice';
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { createGuidAsync, getGuidAsync, getGuidById, updateGuidAsync } from 'Redux/Slice/guidSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

const GuidForm = (props) => {

    const { dialogProps, guid_data, edit } = props;
    const [files, setFiles] = useState([]);
    const [guid, setguid] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        pincode: '',
        address: '',
        pricePerHour: '',
        languages: [],
        about: '',
        cityId: '',
    })
    const { cities: { cities }, } = useSelector(state => state.location);

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        dispatch(getAllCityAsync({ page: 1, page_size: 10 }))
        if (id) {
            dispatch(getGuidById(id)).then((res) => {
                console.log(res)
                const { guide } = res.payload
                console.log(guide);
                setguid({
                    name: guide.name,
                    email: guide.email,
                    password: guide.password,
                    mobile: guide.mobile,
                    pincode: guide.pincode,
                    address: guide.address,
                    pricePerHour: guide.pricePerHour,
                    languages: guide.languages,
                    about: guide.about,
                    cityId: guide.cityId,
                })
                setFiles([guide?.file])
            })
        }
    }, [dispatch, id])

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
        pincode: Yup.string()
            .matches(/^[1-9][0-9]{5}$/, 'Pincode must be a valid 6-digit number')
            .required('Pincode is required'),
        address: Yup.string().required('Required'),
        pricePerHour: Yup.number().min(0, 'Price must be a positive number').required('Required'),
        languages: Yup.array().of(Yup.string().required('Language is required')).required('Required'),
        about: Yup.string().min(20, 'About must be at least 20 characters').required('Required'),
    });

    const formik = useFormik({
        initialValues: guid,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("email", values.email)
            formData.append("cityId", values?.cityId?._id ? values?.cityId?._id : values?.cityId?.id)
            formData.append("mobile", values.mobile)
            formData.append("password", values.password)
            formData.append("address", values.address)
            formData.append("pincode", values.pincode)
            formData.append("pricePerHour", values.pricePerHour);
            formData.append("languages", values.languages);
            formData.append("about", values.about);

            if (files.length) {
                files.forEach((file, index) => {
                    formData.append(`file`, file);
                });
            }

            if (id) {
                dispatch(updateGuidAsync({ formData: formData, id: id, })).then((res) => {
                    const { requestStatus } = res.meta;
                    console.log("res", requestStatus);
                    if (requestStatus === 'fulfilled') {
                        navigate("/guid")
                    }
                })
            }
            else {
                dispatch(createGuidAsync(formData)).then((res) => {
                    console.log("res", res);
                    const { requestStatus } = res.meta;
                    if (requestStatus === 'fulfilled') {
                        navigate("/guid")
                    }
                })
            }
            dialogProps.onClose()

        },
    });
    return (
        <div>
            <Grid container justifyContent={'space-between'} alignItems={'center'} >
                <IconButton color="secondary" edge='start' size='large' aria-label="back" onClick={() => navigate("/guid")}>
                    <IoMdArrowRoundBack />
                </IconButton>
                <Typography variant="h2" gutterBottom>
                    {id ? 'Edit Guid' : 'Create Guid'}
                </Typography>
            </Grid>
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
                            id="mobile"
                            name="mobile"
                            label="Mobile"
                            color='secondary'
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
                            id="pricePerHour"
                            name="pricePerHour"
                            label="Price per Hour"
                            color="secondary"
                            type="number"
                            value={formik.values.pricePerHour}
                            onChange={formik.handleChange}
                            error={formik.touched.pricePerHour && Boolean(formik.errors.pricePerHour)}
                            helperText={formik.touched.pricePerHour && formik.errors.pricePerHour}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            id="languages"
                            name="languages"
                            label="Languages"
                            color="secondary"
                            placeholder="Enter languages separated by commas"
                            value={formik.values.languages.join(', ')}
                            onChange={(e) => formik.setFieldValue('languages', e.target.value.split(',').map(lang => lang.trim()))}
                            error={formik.touched.languages && Boolean(formik.errors.languages)}
                            helperText={formik.touched.languages && formik.errors.languages}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <AutoComplete
                            options={cities || []}
                            label="Select City"
                            id="state-city"
                            name="cityId"
                            value={id ? cities?.find(c => c._id === guid_data?.cityId?._id)?.name : formik?.values?.cityId}
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="about"
                            name="about"
                            label="About"
                            color="secondary"
                            multiline
                            minRows={3}
                            value={formik.values.about}
                            onChange={formik.handleChange}
                            error={formik.touched.about && Boolean(formik.errors.about)}
                            helperText={formik.touched.about && formik.errors.about}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            color='secondary'
                            multiline
                            minRows={3}
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
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