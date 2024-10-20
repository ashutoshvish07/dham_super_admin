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
    IconButton,
    Typography,
    Autocomplete,
} from '@mui/material';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { createRoomAsync, getAllRoomsAsync, getAmenitiesAsync, getHotelAsync, getRoomCateAsync, getRoomsByIdAsync, updateRoomAsync } from 'Redux/Slice/hotelSlice';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';


const HotelRoomForm = (props) => {
    const { dialogProps, room_data, type } = props
    const [files, setFiles] = useState(room_data?.files || []);
    const [state, setState] = useState({
        userId: '',
        roomCategory: '',
        amenities: [],
        price: '',
        offerPrice: '',
        totalNoOfRooms: '',
        area: '',
        floor: '',
        bedSize: '',
    })
    const { hotels, roomCategories, amenities } = useSelector(state => state.hotel)
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate();

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

        if (id) {
            dispatch(getRoomsByIdAsync(id)).then((res) => {
                const { data } = res.payload;
                console.log("res", data)
                setState({
                    userId: data?.userId,
                    roomCategory: data?.roomCategoryId?._id,
                    amenities: data?.amenitiesId || [],
                    price: data?.price || '',
                    offerPrice: data?.offerPrice || '',
                    totalNoOfRooms: data?.totalNoOfRooms || '',
                    area: data?.area.replace("SqFt", '') || '',
                    floor: data?.floor || '',
                    bedSize: data?.bedSize || '',
                })
                setFiles(data.files || [])

            })
        }

        fetchData();
    }, [dispatch, id]);


    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };

    return (
        <div>
            <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 2 }} >
                <IconButton color="secondary" edge='start' size='large' aria-label="back" onClick={() => navigate("/hotel/rooms")}>
                    <IoMdArrowRoundBack />
                </IconButton>
                <Typography variant="h2" gutterBottom>
                    {id ? 'Edit Hotel Rooms' : 'Create Hotel Rooms'}
                </Typography>
            </Grid>
            <Formik

                initialValues={state}
                validationSchema={validationSchema}
                enableReinitialize={true}
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
                            formData.append('amenitiesId[]', amenity._id ? amenity._id : amenity);
                        });
                    }

                    if (files.length) {
                        files.forEach((file, index) => {
                            formData.append('files[]', file);
                            console.log("File", file);
                        });
                    }
                    if (id) {

                        dispatch(updateRoomAsync({ formData: formData, id: id })).then((res) => {
                            const { requestStatus } = res.meta;
                            if (requestStatus === 'fulfilled') {
                                navigate("/hotel/rooms")
                            }
                        }).catch((error) => {
                            console.error('Error creating room:', error);
                        });
                    }
                    else {
                        dispatch(createRoomAsync(formData))
                            .then((res) => {
                                const { requestStatus } = res.meta;
                                if (requestStatus === 'fulfilled') {
                                    navigate("/hotel/rooms")
                                }
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
                                <Autocomplete
                                    options={hotels?.hotels || []}
                                    getOptionLabel={(option) => option.name || ""}
                                    id="hotel-autocomplete"
                                    name="userId"
                                    value={values.userId}
                                    onChange={(event, newValue) => {
                                        const selectedHotel = newValue ? newValue : null;
                                        setFieldValue("userId", selectedHotel);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Hotel Name"
                                            error={touched.userId && Boolean(errors.userId)}
                                            helperText={touched.userId && errors.userId}
                                            color="secondary"
                                            fullWidth
                                        />
                                    )}
                                />
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
                                        color='secondary'
                                        value={values.amenities}
                                        onChange={(event) => setFieldValue('amenities', event.target.value)}
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
                                                    checked={values?.amenities?.includes(amenity._id)}
                                                />
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
                            <Grid item xs={12} display='flex' justifyContent='flex-end' alignItems='flex-end' >
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