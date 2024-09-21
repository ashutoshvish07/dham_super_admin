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
    OutlinedInput,
    MenuItem,
    Checkbox,
    ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createHotelAsync, getAllPropertiesAsync, getAmenitiesAsync, getHotelAsync, updateHotelAsync } from 'Redux/Slice/hotelSlice';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { getAllCityAsync, getAllStateAsync, getCountryBySuperAdminAsync } from 'Redux/Slice/locationSlice';
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';

const HotelForm = ({ type, dialogProps, hotle_data }) => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState(hotle_data?.files || []);
    const { countries, states, cities, loading } = useSelector((state) => state.location);
    const { amenities, properties } = useSelector(state => state.hotel)
    console.log(`hotleData`, hotle_data)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(getCountryBySuperAdminAsync({ page: 1, page_size: 10 })),
                    dispatch(getAllCityAsync({ page: 1, page_size: 10 })),
                    dispatch(getAllStateAsync({ page: 1, page_size: 10 })),
                    dispatch(getAmenitiesAsync({ page: 1, page_size: 10 })),
                    dispatch(getAllPropertiesAsync({ page: 1, page_size: 10 })),
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [dispatch])

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
            countryId: hotle_data?.countryId?.name || "",
            stateId: hotle_data?.stateId?.name || "",
            cityId: hotle_data?.cityId?.name || "",
            propertyTypeId: hotle_data?.propertyTypeId?._id || "",
            address: hotle_data?.address || "",
            pincode: hotle_data?.pincode || "",
            price: hotle_data?.price || "",
            offerPrice: hotle_data?.offerPrice || "",
            amenities: hotle_data?.amenitiesId || [],
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Name must be at least 2 characters')
                .max(50, 'Name cannot exceed 50 characters')
                .required('Name is required'),

            email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),

            mobile: Yup.string()
                .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
                .required('Mobile number is required'),

            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .max(20, 'Password cannot exceed 20 characters'),

            address: Yup.string()
                .min(10, 'Address must be at least 10 characters')
                .required('Address is required'),

            pincode: Yup.string()
                .matches(/^[1-9][0-9]{5}$/, 'Pincode must be a valid 6-digit number')
                .required('Pincode is required'),

            price: Yup.number()
                .min(1, 'Price must be greater than 0')
                .required('Price is required'),

            offerPrice: Yup.number()
                .min(1, 'Offer price must be greater than 0')
                .lessThan(Yup.ref('price'), 'Offer price must be less than the original price')
                .required('Offer price is required'),
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
            formData.append("propertyTypeId", hotle_data?.propertyTypeId?._id ? hotle_data?.propertyTypeId?._id : values?.propertyTypeId?.id)
            formData.append("countryId", hotle_data?.countryId?._id ? hotle_data?.countryId?._id : values?.countryId?._id)
            formData.append("stateId", hotle_data?.stateId?._id ? hotle_data?.stateId?._id : values?.stateId?._id)
            formData.append("cityId", hotle_data?.cityId?._id ? hotle_data?.cityId?._id : values?.cityId?.id)


            if (files.length) {
                files.forEach((file, index) => {
                    formData.append(`files[]`, file);
                });
            }

            if (values.amenities) {
                values.amenities.forEach((amenity) => {
                    formData.append('amenitiesId[]', amenity._id);
                });
            }

            if (type === "edit") {
                dispatch(updateHotelAsync({ formData, id: hotle_data?._id })).then(() => {
                    dispatch(getHotelAsync({ page: 1, page_size: 10 }))
                })
                dialogProps?.onClose();
            } else {
                dispatch(createHotelAsync(formData)).then(() => {
                    dispatch(getHotelAsync({ page: 1, page_size: 10 }))
                })
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
                            formik.values.countryId
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
                            formik.values.stateId
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
                            formik.values.cityId
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
                        type='number'
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
                        type='number'
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
                        type='number'
                        value={formik.values?.offerPrice}
                        onChange={formik.handleChange}
                        error={formik.touched.offerPrice && Boolean(formik.errors.offerPrice)}
                        helperText={formik.touched.offerPrice && formik.errors.offerPrice}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AutoComplete
                        options={properties?.propertyType || []}
                        label="Select Property Type"
                        id="property-select"
                        name="propertyTypeId"
                        value={
                            formik.values.propertyTypeId
                        }
                        onChange={(newValue) => {
                            formik.setFieldValue('propertyTypeId', newValue || '');
                        }}
                        error={formik.touched.propertyTypeId && Boolean(formik.errors.propertyTypeId)}
                        helperText={formik.touched.propertyTypeId && formik.errors.propertyTypeId}
                        required
                        optionKey="_id"
                        optionLabel="name"
                        color="secondary"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth color='secondary'>
                        <InputLabel id="amenities-label">Amenities</InputLabel>
                        <Select
                            labelId="amenities-label"
                            id="amenities"
                            name="amenities"
                            multiple
                            value={formik.values.amenities}
                            onChange={(event) => formik.setFieldValue('amenities', event.target.value)}
                            input={<OutlinedInput label="Amenities" />}
                            renderValue={(selected) => selected.map((item) => item.name).join(', ')}
                        >
                            {amenities?.data?.map((amenity) => (
                                <MenuItem key={amenity._id} value={amenity}>
                                    <Checkbox checked={formik.values.amenities.some((item) => item._id === amenity._id)} />
                                    <ListItemText primary={amenity.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        color='secondary'
                        fullWidth
                        id="address"
                        name="address"
                        label="Address"
                        minRows={3}
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
