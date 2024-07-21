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
import { createAdvertisement, getAdvertisement, updateAdvertisement } from 'Redux/Slice/advertisementSlice';
import { LocalizationProvider, AdapterDateFns, DatePicker } from '@mui/x-date-pickers';


const AdvertisementForm = (props) => {

    const { dialogProps, guid_data, edit } = props;
    const [files, setFiles] = useState([]);

    const { cities: { cities }, } = useSelector(state => state.location);


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
        title: Yup.string().required('Required'),
        description: Yup.string().description('Invalid description address').required('Required'),
        offerOnItem: Yup.string().required('Required'),
        discountPercentage: Yup.string().required('Required'),
        discountAmount: Yup.string().required('Required'),
        cityId: Yup.string().required('Required'),
        validFrom: Yup.date().required('Required'),
        validUpto: Yup.date().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            offerOnItem: '',
            cityId: '',
            discountPercentage: '',
            discountAmount: '',
            validFrom: null,
            validUpto: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData()
            formData.append("title", values.title)
            formData.append("description", values.description)
            formData.append("offerOnItem", values.mobile)
            formData.append("discountPercentage", values.discountPercentage)
            formData.append("discountAmount", values.discountAmount)
            formData.append("validFrom", values.validFrom ? values.validFrom.toISOString() : '');
            formData.append("validUpto", values.validUpto ? values.validUpto.toISOString() : '');

            formData.append("cityId", values?.cityId?._id ? values?.cityId?._id : values?.cityId)

            if (files) {
                files.map((file) => {
                    formData.append('file', file);
                });
            }

            if (edit) {
                dispatch(updateAdvertisement({ formData: formData, id: guid_data?._id, })).then(() => {
                    dispatch(getAdvertisement({ page: 1, page_size: 10 }))
                })
            }
            else {
                dispatch(createAdvertisement(formData)).then(() => {
                    dispatch(getAdvertisement({ page: 1, page_size: 10 }))
                })
            }
            dialogProps.onClose()

        },
    });


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Title"
                            color="secondary"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            color="secondary"
                            minRows={2}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="offerOnItem"
                            name="offerOnItem"
                            label="Offer On Item"
                            color="secondary"
                            value={formik.values.offerOnItem}
                            onChange={formik.handleChange}
                            error={formik.touched.offerOnItem && Boolean(formik.errors.offerOnItem)}
                            helperText={formik.touched.offerOnItem && formik.errors.offerOnItem}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="discountPercentage"
                            name="discountPercentage"
                            label="Discount Percentage"
                            color="secondary"
                            value={formik.values.discountPercentage}
                            onChange={formik.handleChange}
                            error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                            helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="discountAmount"
                            name="discountAmount"
                            label="Discount Amount"
                            color="secondary"
                            value={formik.values.discountAmount}
                            onChange={formik.handleChange}
                            error={formik.touched.discountAmount && Boolean(formik.errors.discountAmount)}
                            helperText={formik.touched.discountAmount && formik.errors.discountAmount}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="Valid From"
                            value={formik.values.validFrom}
                            onChange={(newValue) => formik.setFieldValue('validFrom', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    id="validFrom"
                                    name="validFrom"
                                    error={formik.touched.validFrom && Boolean(formik.errors.validFrom)}
                                    helperText={formik.touched.validFrom && formik.errors.validFrom}
                                    color="secondary"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="Valid Upto"
                            value={formik.values.validUpto}
                            onChange={(newValue) => formik.setFieldValue('validUpto', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    id="validUpto"
                                    name="validUpto"
                                    error={formik.touched.validUpto && Boolean(formik.errors.validUpto)}
                                    helperText={formik.touched.validUpto && formik.errors.validUpto}
                                    color="secondary"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AutoComplete
                            options={cities || []}
                            label="Select City"
                            id="state-city"
                            name="cityId"
                            value={edit ? cities?.find(c => c._id === guid_data?.cityId?._id)?.name : formik?.values?.cityId}
                            onChange={(newValue) => formik.setFieldValue('cityId', newValue || '')}
                            error={formik.touched.cityId && Boolean(formik.errors.cityId)}
                            helperText={formik.touched.cityId && formik.errors.cityId}
                            required
                            optionKey="_id"
                            optionLabel="name"
                            color="secondary"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ImageUpload label="Upload Your Images" files={files} setFiles={handleFileChange} deleteFile={handleDeleteFile} multiple={false} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
                        <Button color="secondary" variant="outlined" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    )
}

export default AdvertisementForm