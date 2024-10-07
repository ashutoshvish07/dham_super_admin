import React, { useEffect, useState } from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';
import { Grid, TextField, Button, MenuItem, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { Box } from '@mui/system';
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCityAsync } from 'Redux/Slice/locationSlice';
import moment from 'moment';
import { createeventtourAsync, geteventtourIdAsync, updateeventtourAsync } from 'Redux/Slice/eventTourSlice';


const EventTourForm = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const [files, setFiles] = useState([]);
    const { cities, } = useSelector((state) => state.location);


    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        start_from: '',
        end_at: '',
        departure_date: '',
        departure_time: '',
        duration: '',
        plans: [{ day: '', destination: '', description: '' }],
        packageCost: [{ package: 'Basic', cost: '' }],
        type: 'event',
        departure_from: '',
        cityId: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(getAllCityAsync({ page: 1, page_size: 10 })),
                ]);

                if (id) {
                    dispatch(geteventtourIdAsync({ id: id })).then((response) => {
                        const { tourAndEvent } = response?.payload;
                        setInitialValues({
                            title: tourAndEvent?.title || '',
                            description: tourAndEvent?.description || '',
                            start_from: moment(tourAndEvent?.start_from).format('YYYY-MM-DD') || '',
                            end_at: moment(tourAndEvent?.end_at).format('YYYY-MM-DD') || '',
                            departure_date: moment(tourAndEvent?.departure_date).format('YYYY-MM-DD') || '',
                            departure_time: tourAndEvent?.departure_time || '',
                            // cost: tourAndEvent?.cost || null,
                            duration: tourAndEvent?.duration || '',
                            plans: tourAndEvent?.plans || [{ day: '', destination: '', description: '' }],
                            type: tourAndEvent?.type || 'event',
                            departure_from: tourAndEvent?.departure_from || '',
                            cityId: tourAndEvent?.cityId || '',
                            packageCost: tourAndEvent?.packageCost || [{ package: 'Basic', cost: '' }],
                        })
                        setFiles(tourAndEvent.files)
                    })
                } else {
                    setInitialValues({
                        title: '',
                        description: '',
                        start_from: '',
                        end_at: '',
                        departure_date: '',
                        departure_time: '',
                        // cost: '',
                        duration: '',
                        plans: [{ day: '', destination: '', description: '' }],
                        type: 'event',
                        departure_from: '',
                        cityId: '',
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

    const validationSchema = Yup.object({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        start_from: Yup.date().required('Required'),
        end_at: Yup.date().required('Required').min(Yup.ref('start_from'), 'End date must be after start date'),
        departure_date: Yup.date().required('Required'),
        departure_time: Yup.string().required('Required'),
        duration: Yup.number().positive('Must be positive').integer('Must be an integer').required('Required'),
        type: Yup.string().required('Required'),
        departure_from: Yup.string().required('Required'),
        plans: Yup.array().of(
            Yup.object().shape({
                day: Yup.number().positive('Must be positive').integer('Must be an integer').required('Required'),
                destination: Yup.string().required('Required'),
                description: Yup.string().required('Required'),
            })
        ).min(1, 'At least one plan is required'),
        packageCost: Yup.array().of(
            Yup.object().shape({
                package: Yup.string().oneOf(['VIP', 'Basic']).required('Required'),
                cost: Yup.number().positive('Must be positive').required('Required'),
            })
        ).min(1, 'At least one pricing option is required'),
    });


    return (
        <>
            <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 2 }} >
                <IconButton color="secondary" edge='start' size='large' aria-label="back" onClick={() => navigate("/event-tours")}>
                    <IoMdArrowRoundBack />
                </IconButton>
                <Typography variant="h2" gutterBottom>
                    {id ? 'Edit Event & Tours' : 'Create Event & Tours'}
                </Typography>
            </Grid>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values, { setSubmitting }) => {
                    const formData = new FormData();

                    formData.append("title", values.title)
                    formData.append("description", values.description)
                    formData.append("start_from", moment(values.start_from).format('YYYY-MM-DD'))
                    formData.append("end_at", moment(values.end_at).format('YYYY-MM-DD'))
                    formData.append("departure_date", moment(values.departure_date).format('YYYY-MM-DD'))
                    formData.append("departure_time", values.departure_time)
                    // formData.append("cost", values.cost)
                    formData.append("duration", values.duration)
                    formData.append("type", values.type)
                    formData.append("departure_from", values.departure_from)
                    formData.append("cityId", values.cityId ? values.cityId : values.cityId?.id)
                    formData.append("plans", JSON.stringify(values.plans))
                    formData.append("packageCost", JSON.stringify(values.packageCost))
                    debugger


                    if (files.length) {
                        files.forEach((file, index) => {
                            formData.append(`files[]`, file);
                        });
                    }

                    if (!id) {
                        dispatch(createeventtourAsync(formData)).then((response) => {
                            navigate('/event-tours')
                        })
                    } else {
                        dispatch(updateeventtourAsync({ formData: formData, id: id })).then((response) => {
                            console.log('response:', response);
                            navigate('/event-tours')
                        })
                    }


                    setSubmitting(false);
                }}
            >
                {({ values, errors, touched, handleChange, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Title"
                                    color="secondary"
                                    name="title"
                                    error={touched.title && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    color="secondary"
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Start Date"
                                    name="start_from"
                                    type="date"
                                    color="secondary"
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.start_from && Boolean(errors.start_from)}
                                    helperText={touched.start_from && errors.start_from}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="End Date"
                                    name="end_at"
                                    type="date"
                                    color="secondary"
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.end_at && Boolean(errors.end_at)}
                                    helperText={touched.end_at && errors.end_at}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Departure Date"
                                    name="departure_date"
                                    type="date"
                                    color="secondary"
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.departure_date && Boolean(errors.departure_date)}
                                    helperText={touched.departure_date && errors.departure_date}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Departure Time"
                                    name="departure_time"
                                    type="time"
                                    color="secondary"
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.departure_time && Boolean(errors.departure_time)}
                                    helperText={touched.departure_time && errors.departure_time}
                                />
                            </Grid>

                            {/* <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    color="secondary"
                                    fullWidth
                                    label="Cost"
                                    name="cost"
                                    type="number"
                                    error={touched.cost && Boolean(errors.cost)}
                                    helperText={touched.cost && errors.cost}
                                />
                            </Grid> */}

                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    color="secondary"
                                    fullWidth
                                    label="Duration (Days)"
                                    name="duration"
                                    type="number"
                                    error={touched.duration && Boolean(errors.duration)}
                                    helperText={touched.duration && errors.duration}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    color="secondary"
                                    select
                                    label="Type"
                                    name="type"
                                    error={touched.type && Boolean(errors.type)}
                                    helperText={touched.type && errors.type}
                                >
                                    <MenuItem value="event">Event</MenuItem>
                                    <MenuItem value="tour">Tour</MenuItem>
                                </Field>
                            </Grid>

                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    color="secondary"
                                    label="Departure From"
                                    name="departure_from"
                                    error={touched.departure_from && Boolean(errors.departure_from)}
                                    helperText={touched.departure_from && errors.departure_from}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <AutoComplete
                                    options={cities?.cities || []}
                                    label="Select City"
                                    id="city-select"
                                    name="cityId"
                                    value={
                                        values.cityId
                                    }
                                    onChange={(newValue) => {
                                        setFieldValue('cityId', newValue || '');
                                    }}
                                    error={touched.cityId && Boolean(errors.cityId)}
                                    helperText={touched.cityId && errors.cityId}
                                    required
                                    optionKey="_id"
                                    optionLabel="name"
                                    color="secondary"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 1 }}>Plans</Typography>
                                <FieldArray name="plans" >
                                    {({ remove, push }) => (
                                        <div>
                                            {values.plans.map((plan, index) => (
                                                <Grid container spacing={2} key={index} alignItems="center" justifyContent='center'>
                                                    <Grid item xs={2}>
                                                        <Field
                                                            as={TextField}
                                                            fullWidth
                                                            label="Day"
                                                            name={`plans.${index}.day`}
                                                            color="secondary"
                                                            type="number"
                                                            error={touched.plans?.[index]?.day && Boolean(errors.plans?.[index]?.day)}
                                                            helperText={touched.plans?.[index]?.day && errors.plans?.[index]?.day}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Field
                                                            as={TextField}
                                                            fullWidth
                                                            label="Destination"
                                                            color="secondary"
                                                            name={`plans.${index}.destination`}
                                                            error={touched.plans?.[index]?.destination && Boolean(errors.plans?.[index]?.destination)}
                                                            helperText={touched.plans?.[index]?.destination && errors.plans?.[index]?.destination}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5}>
                                                        <Field
                                                            as={TextField}
                                                            fullWidth
                                                            color="secondary"
                                                            label="Description"
                                                            name={`plans.${index}.description`}
                                                            error={touched.plans?.[index]?.description && Boolean(errors.plans?.[index]?.description)}
                                                            helperText={touched.plans?.[index]?.description && errors.plans?.[index]?.description}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <IconButton color='secondary' onClick={() => remove(index)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={2} style={{ marginTop: '4px' }}> {/* Added row gap */}
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Button
                                                startIcon={<AddIcon />}
                                                onClick={() => push({ day: '', destination: '', description: '' })}
                                            >
                                                Add Plan
                                            </Button>
                                        </div>
                                    )}
                                </FieldArray>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 1 }}>Pricing Options</Typography>
                                <FieldArray name="packageCost">
                                    {({ remove, push }) => (
                                        <div>
                                            {values?.packageCost?.map((option, index) => (
                                                <Grid container spacing={2} key={index} alignItems="center" justifyContent='center'>
                                                    <Grid item xs={4}>
                                                        <Field
                                                            as={TextField}
                                                            fullWidth
                                                            select
                                                            label="Package"
                                                            name={`packageCost.${index}.package`}
                                                            color="secondary"
                                                            error={touched.packageCost?.[index]?.package && Boolean(errors.packageCost?.[index]?.package)}
                                                            helperText={touched.packageCost?.[index]?.package && errors.packageCost?.[index]?.package}
                                                        >
                                                            <MenuItem value="none">None</MenuItem>
                                                            <MenuItem value="VIP">VIP</MenuItem>
                                                            <MenuItem value="Basic">Basic</MenuItem>
                                                        </Field>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Field
                                                            as={TextField}
                                                            fullWidth
                                                            label="Cost"
                                                            name={`packageCost.${index}.cost`}
                                                            type="number"
                                                            color="secondary"
                                                            error={touched.packageCost?.[index]?.cost && Boolean(errors.packageCost?.[index]?.cost)}
                                                            helperText={touched.packageCost?.[index]?.cost && errors.packageCost?.[index]?.cost}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={2}>
                                                        <IconButton color='secondary' onClick={() => remove(index)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={2} style={{ marginTop: '4px' }}> {/* Added row gap */}
                                                    </Grid>
                                                </Grid>
                                            ))}

                                            <Button
                                                startIcon={<AddIcon />}
                                                onClick={() => push({ package: 'Basic', cost: '' })}
                                            >
                                                Add Pricing Option
                                            </Button>
                                        </div>
                                    )}
                                </FieldArray>
                            </Grid>

                            <Grid item xs={12}>
                                <ImageUpload files={files} setFiles={handleFileChange} deleteFile={handleDeleteFile} />
                            </Grid>

                            <Grid item xs={12}>


                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                                    <Button type="submit" variant="contained" color="secondary" size="medium">
                                        Submit
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default EventTourForm;