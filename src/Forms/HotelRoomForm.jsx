import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
    TextField,
    Button,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Grid,
} from '@mui/material';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { createRoomAsync, getAllRoomsAsync, getAmenitiesAsync, getHotelAsync, getRoomCateAsync, updateRoomAsync } from 'Redux/Slice/hotelSlice';
import * as Yup from 'yup';


const HotelRoomForm = (props) => {
    const { dialogProps, room_data, type } = props
    const [files, setFiles] = useState([]);
    const { hotels, roomCategories, amenities } = useSelector(state => state.hotel)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(getAmenitiesAsync({ page: 1, page_size: 10 })),
                    dispatch(getRoomCateAsync({ page: 1, page_size: 10 })),
                    dispatch(getHotelAsync({ page: 1, page_size: 10 }))
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    const initialValues = {
        userId: room_data?.userId?.name || '',
        roomCategory: room_data?.roomCategoryId?._id || '',
        amenities: room_data?.amenitiesId || [],
        price: room_data?.price || '',
        offerPrice: room_data?.offerPrice || '',
        totalNoOfRooms: room_data?.totalNoOfRooms || '',
        area: room_data?.area || '',
        floor: room_data?.floor || '',
        bedSize: room_data?.bedSize || '',
    };
    const validationSchema = Yup.object({
        amenities: Yup.array().min(1, 'Select at least one amenity').required('Amenities are required'),
        price: Yup.number().required('Price is required').positive('Price must be a positive number'),
        offerPrice: Yup.number().required('Offer Price is required').positive('Offer Price must be a positive number'),
        totalNoOfRooms: Yup.number().required('Total Number of Rooms is required').positive('Total Number of Rooms must be a positive number'),
        area: Yup.number().required('Area is required').positive('Area must be a positive number'),
        floor: Yup.string().required('Floor is required'),
        bedSize: Yup.string().required('Bed Size is required'),
    });

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const formData = new FormData();
                    formData.append('userId', values?.userId?._id);
                    formData.append('roomCategoryId', values.roomCategory._id);
                    formData.append('price', values.price);
                    formData.append('offerPrice', values.offerPrice);
                    formData.append('totalNoOfRooms', values.totalNoOfRooms);
                    formData.append('area', `${values.area}SqFt`);
                    formData.append('floor', values.floor);
                    formData.append('bedSize', values.bedSize);

                    if (values.amenities) {
                        values.amenities.forEach((amenity) => {
                            formData.append('amenitiesId[]', amenity._id);
                        });
                    }

                    if (files.length) {
                        files.forEach((file, index) => {
                            formData.append('files[]', file);
                            console.log("File", file);
                        });
                    }
                    if (type === "edit") {
                        dispatch(updateRoomAsync({ formData: formData, id: room_data?._id })).then(() => {
                            dispatch(getAllRoomsAsync({ page: 1, page_size: 10 }));
                        })
                            .catch((error) => {
                                console.error('Error creating room:', error);
                            });
                    }
                    else {
                        dispatch(createRoomAsync(formData))
                            .then(() => {
                                dispatch(getAllRoomsAsync({ page: 1, page_size: 10 }));
                            })
                            .catch((error) => {
                                console.error('Error creating room:', error);
                            });
                    }

                    dialogProps.onClose()
                }}
            >
                {({ setFieldValue, values, handleChange, handleBlur, touched, errors }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={touched.userId && Boolean(errors.userId)} color='secondary'
                                >
                                    <InputLabel id="rooms-label">Hotel Name</InputLabel>
                                    <Select
                                        labelId="hotle-label"
                                        id="rooms-label"
                                        name="userId"
                                        value={values.userId}
                                        onChange={(e) => {
                                            const selectedHotel = hotels.hotels.find(hotel => hotel._id === e.target.value._id);
                                            setFieldValue("userId", selectedHotel);
                                        }}
                                        label="Hotel Name"
                                    >
                                        {hotels?.hotels?.map((hotel) => (
                                            <MenuItem key={hotel._id} value={hotel}>
                                                <ListItemText primary={hotel.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.userId && errors.userId && (
                                        <div style={{ color: 'red', fontSize: '12px' }}>{errors.userId}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={touched.roomCategory && Boolean(errors.roomCategory)} color='secondary'
                                >
                                    <InputLabel id="roomCategory-label">Room Category</InputLabel>
                                    <Select
                                        labelId="roomCategory-label"
                                        id="roomCategory"
                                        name="roomCategory"
                                        value={values.roomCategory}
                                        onChange={(e) => {
                                            const selectedCategory = roomCategories.categories.find(category => category._id === e.target.value._id);
                                            setFieldValue("roomCategory", selectedCategory);
                                        }}
                                        label="Room Category"
                                    >
                                        {roomCategories?.categories?.map((category) => (
                                            <MenuItem key={category._id} value={category}>
                                                <ListItemText primary={category.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.roomCategory && errors.roomCategory && (
                                        <div style={{ color: 'red', fontSize: '12px' }}>{errors.roomCategory}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={touched.amenities && Boolean(errors.amenities)} color='secondary'
                                >
                                    <InputLabel id="amenities-label">Amenities</InputLabel>
                                    <Select
                                        labelId="amenities-label"
                                        id="amenities"
                                        name="amenities"
                                        multiple
                                        value={values.amenities}
                                        onChange={(event) => setFieldValue('amenities', event.target.value)}
                                        input={<OutlinedInput label="Amenities" />}
                                        renderValue={(selected) => selected.map((item) => item.name).join(', ')}
                                    >
                                        {amenities?.data?.map((amenity) => (
                                            <MenuItem key={amenity._id} value={amenity}>
                                                <Checkbox checked={values.amenities.some((item) => item._id === amenity._id)} />
                                                <ListItemText primary={amenity.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.amenities && errors.amenities && (
                                        <div style={{ color: 'red', fontSize: '12px' }}>{errors.amenities}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    color='secondary'

                                    fullWidth
                                    name="price"
                                    label="Price"
                                    variant="outlined"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.price && Boolean(errors.price)}
                                    helperText={touched.price && errors.price}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    color='secondary'

                                    name="offerPrice"
                                    label="Offer Price"
                                    variant="outlined"
                                    value={values.offerPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.offerPrice && Boolean(errors.offerPrice)}
                                    helperText={touched.offerPrice && errors.offerPrice}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    color='secondary'

                                    fullWidth
                                    name="totalNoOfRooms"
                                    label="Total Number of Rooms"
                                    variant="outlined"
                                    value={values.totalNoOfRooms}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.totalNoOfRooms && Boolean(errors.totalNoOfRooms)}
                                    helperText={touched.totalNoOfRooms && errors.totalNoOfRooms}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    name="area"
                                    color='secondary'

                                    label="Area"
                                    variant="outlined"
                                    value={values.area}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.area && Boolean(errors.area)}
                                    helperText={touched.area && errors.area}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    name="floor"
                                    color='secondary'

                                    label="Floor"
                                    variant="outlined"
                                    value={values.floor}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.floor && Boolean(errors.floor)}
                                    helperText={touched.floor && errors.floor}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    color='secondary'

                                    name="bedSize"
                                    label="Bed Size"
                                    variant="outlined"
                                    value={values.bedSize}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.bedSize && Boolean(errors.bedSize)}
                                    helperText={touched.bedSize && errors.bedSize}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ImageUpload label="Upload Your Images" files={files} setFiles={handleFileChange} deleteFile={handleDeleteFile} multiple={true} />
                            </Grid>
                            <Grid item xs={12} justifyContent='flex-end' >
                                <Button type="submit" variant="outlined" color="secondary" >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default HotelRoomForm