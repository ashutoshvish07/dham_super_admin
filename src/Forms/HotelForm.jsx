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
    IconButton,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearhotelData, createHotelAsync, getAllFoodAndDiningAsync, getAllPropertiesAsync, getAmenitiesAsync, getHotelAsync, getHotelByIdAsync, updateHotelAsync } from 'Redux/Slice/hotelSlice';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { getAllCityAsync, getAllStateAsync, getCountryBySuperAdminAsync } from 'Redux/Slice/locationSlice';
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

const HotelForm = ({ type, dialogProps, hotle_data }) => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const navigate = useNavigate()
    const { amenities, properties, foodAndDining, hotelData, loading } = useSelector(state => state.hotel)
    console.log("foodAndDining", foodAndDining)
    const [state, setstate] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        countryId: "",
        stateId: "",
        cityId: "",
        propertyTypeId: "",
        address: "",
        pincode: "",
        price: "",
        offerPrice: "",
        amenities: [],
    })

    const [files, setFiles] = useState([]);
    const { countries, states, cities, } = useSelector((state) => state.location);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(getCountryBySuperAdminAsync({ page: 1, page_size: 10 })),
                    dispatch(getAllCityAsync({ page: 1, page_size: 10 })),
                    dispatch(getAllStateAsync({ page: 1, page_size: 10 })),
                    dispatch(getAmenitiesAsync({ page: 1, page_size: 10 })),
                    dispatch(getAllPropertiesAsync({ page: 1, page_size: 10 })),
                    dispatch(getAllFoodAndDiningAsync({ page: 1, page_size: 10 }))
                ]);

                if (id) {
                    dispatch(getHotelByIdAsync({ id: id })).then((response) => {
                        const { data } = response?.payload;
                        setstate({
                            name: data?.name || "",
                            email: data?.email || "",
                            mobile: data?.mobile || "",
                            password: data?.password || "",
                            countryId: data?.countryId || "",
                            stateId: data?.stateId || "",
                            cityId: data?.cityId?.name || "",
                            propertyTypeId: data?.propertyTypeId || "",
                            address: data?.address || "",
                            pincode: data?.pincode || "",
                            price: data?.price || "",
                            offerPrice: data?.offerPrice || "",
                            amenities: data?.amenitiesId || [],
                            foodAndDiningId: data?.foodAndDiningId || "",
                        })
                        setFiles(data.files)
                    })
                } else {
                    setstate({
                        name: "",
                        email: "",
                        mobile: "",
                        password: "",
                        countryId: "",
                        stateId: "",
                        cityId: "",
                        propertyTypeId: "",
                        address: "",
                        pincode: "",
                        price: "",
                        offerPrice: "",
                        amenities: [],
                        foodAndDiningId: "",
                    })
                    setFiles([])
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        fetchData();

    }, [dispatch, id])


    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };

    const formik = useFormik({
        initialValues: state,
        enableReinitialize: true,
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
                .min(8, 'Password must be at least 8 characters'),

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
            formData.append("propertyTypeId", hotelData?.propertyTypeId ? hotelData?.propertyTypeId : values?.propertyTypeId?.id)
            formData.append("countryId", hotelData?.countryId?._id ? hotelData?.countryId?._id : values?.countryId?._id)
            formData.append("stateId", hotelData?.stateId?._id ? hotelData?.stateId?._id : values?.stateId?._id)
            formData.append("cityId", hotelData?.cityId?._id ? hotelData?.cityId?._id : values?.cityId?.id)
            formData.append("foodAndDiningId", hotelData?.foodAndDiningId?._id ? hotelData?.foodAndDiningId?._id : values?.foodAndDiningId?._id)

            if (files.length) {
                files.forEach((file, index) => {
                    formData.append(`files[]`, file);
                });
            }

            if (values.amenities) {
                values.amenities.forEach((amenity) => {
                    formData.append('amenitiesId[]', amenity._id ? amenity._id : amenity);
                });
            }

            if (id) {
                dispatch(updateHotelAsync({ formData, id: hotelData?._id })).then((res) => {
                    console.log(res);
                    dispatch(getHotelAsync({ page: 1, page_size: 10 }))
                    navigate("/hotel/hotels")
                })
            } else {
                dispatch(createHotelAsync(formData)).then((res) => {
                    console.log(res);
                    dispatch(getHotelAsync({ page: 1, page_size: 10 }))
                    navigate("/hotel/hotels")
                })
            }
        },
    });


    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Grid container justifyContent={'space-between'} alignItems={'center'} >
                <IconButton color="secondary" edge='start' size='large' aria-label="back" onClick={() => navigate("/hotel/hotels")}>
                    <IoMdArrowRoundBack />
                </IconButton>
                <Typography variant="h2" gutterBottom>
                    {id ? 'Edit Hotel' : 'Create Hotel'}
                </Typography>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            color='secondary'
                            fullWidth
                            required
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
                            required
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
                            required
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
                                id ? countries?.countries?.find(count => count?._id === formik.values.countryId)?.name : formik.values.countryId
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
                                id ? states?.states?.find(stat => stat?._id === formik.values.stateId)?.name : formik.values.stateId
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
                            required
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
                            required
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
                                renderValue={(selected) =>
                                    amenities?.data
                                        ?.filter((amenity) => selected.includes(amenity._id))
                                        .map((item) => item.name)
                                        .join(', ')
                                }
                            >
                                {amenities?.data?.map((amenity) => (
                                    <MenuItem key={amenity._id} value={amenity._id}>
                                        <Checkbox
                                            color="secondary"
                                            checked={formik?.values?.amenities?.includes(amenity._id)}
                                        />
                                        <ListItemText primary={amenity.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <AutoComplete
                            options={foodAndDining?.data || []}
                            label="Select Food & Dining"
                            id="property-select"
                            name="foodAndDiningId"
                            value={
                                formik.values.foodAndDiningId
                            }
                            onChange={(newValue) => {
                                formik.setFieldValue('foodAndDiningId', newValue || '');
                            }}
                            error={formik.touched.foodAndDiningId && Boolean(formik.errors.foodAndDiningId)}
                            helperText={formik.touched.foodAndDiningId && formik.errors.foodAndDiningId}
                            optionKey="_id"
                            optionLabel="name"
                            color="secondary"
                        />
                    </Grid>




                    <Grid item xs={12}>
                        <TextField
                            color='secondary'
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            multiline
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
        </>
    );
};

export default HotelForm;
