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
import { getAllCityAsync } from 'Redux/Slice/locationSlice';
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { createAdvertisement, getAdvertisement, getAdvertisementById, updateAdvertisement } from 'Redux/Slice/advertisementSlice';
import CustomDatePicker from 'components/DatePicker/CustomDatePicker';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    offerOnItem: Yup.string().required('Required'),
    discountPercentage: Yup.string().required('Required'),
    discountAmount: Yup.string().required('Required'),
    validFrom: Yup.date().required('Required'),
    validUpto: Yup.date().required('Required'),
});


const AdvertisementForm = (props) => {

    const { dialogProps, edit } = props;
    const { cities: { cities } } = useSelector(state => state.location);
    console.log("cities", cities)
    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams()

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            offerOnItem: '',
            cityId: null,
            discountPercentage: '',
            discountAmount: '',
            validFrom: null,
            validUpto: null,
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("offerOnItem", values.offerOnItem);
            formData.append("discountPercentage", values.discountPercentage);
            formData.append("discountAmount", values.discountAmount);
            formData.append("validFrom", values.validFrom.toISOString());
            formData.append("validUpto", values.validUpto.toISOString());
            formData.append("cityId", values?.cityId?.id ? values?.cityId?.id : values?.cityId)

            if (files) {
                files.forEach((file) => {
                    formData.append('file', file);
                });
            }

            if (id) {
                dispatch(updateAdvertisement({ formData: formData, id: id }))
                    .then((res) => {
                        console.log(res)
                        const { requestStatus } = res.meta;
                        if (requestStatus === 'fulfilled') {
                            navigate("/advertisement")
                        }
                    });
            } else {
                dispatch(createAdvertisement(formData))
                    .then((res) => {
                        const { requestStatus } = res.meta;
                        if (requestStatus === 'fulfilled') {
                            navigate("/advertisement")
                        }
                    });
            }
            dialogProps.onClose();
        },
    });


    useEffect(() => {
        dispatch(getAllCityAsync({ page: 1, page_size: 10 }));
        if (id) {
            dispatch(getAdvertisementById(id)).then(res => {
                const data = res.payload;
                formik.setValues({
                    title: data.title,
                    description: data.description,
                    offerOnItem: data.offerOnItem,
                    cityId: data.cityId,
                    discountPercentage: data.discountPercentage,
                    discountAmount: data.discountAmount,
                    validFrom: dayjs(data.validFrom),
                    validUpto: dayjs(data.validUpto),
                });
                setFiles([data.file]);
            })
        }

    }, [dispatch, id]);

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };



    console.log("formik", formik.initialValues)
    return (
        <>
            <Grid container justifyContent={'space-between'} alignItems={'center'} >
                <IconButton color="secondary" edge='start' size='large' aria-label="back" onClick={() => navigate("/advertisement")}>
                    <IoMdArrowRoundBack />
                </IconButton>
                <Typography variant="h2" gutterBottom>
                    {id ? 'Edit Advertisement' : 'Create Advertisement'}
                </Typography>
            </Grid>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Title"
                            color='secondary'
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
                            color='secondary'
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
                            color='secondary'
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
                            color='secondary'
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
                            color='secondary'
                            value={formik.values.discountAmount}
                            onChange={formik.handleChange}
                            error={formik.touched.discountAmount && Boolean(formik.errors.discountAmount)}
                            helperText={formik.touched.discountAmount && formik.errors.discountAmount}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AutoComplete
                            options={cities || []}
                            label="Select City"
                            id="state-city"
                            name="cityId"
                            value={formik.values.cityId}
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
                        <CustomDatePicker
                            label="Valid From"
                            fullWidth
                            sx={{ width: "100%" }}
                            value={formik.values.validFrom}
                            onChange={(newValue) => formik.setFieldValue('validFrom', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="validFrom"
                                    name="validFrom"
                                    color='secondary'

                                    error={formik.touched.validFrom && Boolean(formik.errors.validFrom)}
                                    helperText={formik.touched.validFrom && formik.errors.validFrom}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomDatePicker
                            label="Valid Upto"
                            fullWidth
                            sx={{ width: "100%" }}
                            value={formik.values.validUpto}
                            onChange={(newValue) => formik.setFieldValue('validUpto', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    color='secondary'

                                    id="validUpto"
                                    name="validUpto"
                                    error={formik.touched.validUpto && Boolean(formik.errors.validUpto)}
                                    helperText={formik.touched.validUpto && formik.errors.validUpto}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ImageUpload label="Upload Your Images" files={files} setFiles={handleFileChange} deleteFile={handleDeleteFile} multiple={false} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
                        <Button color='secondary' variant="outlined" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default AdvertisementForm;
