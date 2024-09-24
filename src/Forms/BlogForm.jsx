import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Box,
    Chip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Grid,
    IconButton,
    TextareaAutosize,
} from '@mui/material';
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCityAsync } from 'Redux/Slice/locationSlice';
import { clearSingleBlog, createblogsAsync, getblogsDataByIdAsync, updateblogsAsync } from 'Redux/Slice/blogSlice';
import { borderRadius } from '@mui/system';




const BlogForm = (props) => {
    const navigate = useNavigate()
    const [files, setFiles] = useState([]);
    const { cities: { cities }, } = useSelector(state => state.location)
    const [content, setContent] = useState('');
    const { id } = useParams()
    const [values, setValues] = useState({
        title: '',
        content: '',
        tags: [],
        shortNote: "",
        cityId: '',
    });


    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        tags: Yup.array().of(Yup.string()),
        shortNote: Yup.string().required('Short Note is required'),
    });




    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCityAsync({ page: 1, page_size: 10 }));
        if (id) {
            dispatch(getblogsDataByIdAsync({ id })).then((result) => {
                const { data } = result?.payload;
                console.log("result: blogForm ", data);
                setValues({
                    title: data?.title,
                    content: data?.content,
                    tags: data?.tags || [],
                    shortNote: data?.shortNote,
                    cityId: data?.cityId,
                })
                setContent(data?.content)
                setFiles(data?.files)
            }).catch((err) => {
                console.log("error: ", err);
            });
        } else {
            dispatch(clearSingleBlog());
        }
        return () => {
            dispatch(clearSingleBlog());
        };
    }, [dispatch, id]);


    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDeleteFile = (fileToDelete) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values?.content);
        formData.append('cityId', values.cityId?._id ? values.cityId?._id : values.cityId?.id);
        formData.append('shortNote', values.shortNote)
        if (values.tags) {
            values.tags.map((file) => {
                formData.append('tags[]', file);
            });
        }

        if (files) {
            files.map((file) => {
                formData.append('files[]', file);
            });
        }

        if (id) {
            dispatch(updateblogsAsync({ formData: formData, id: id })).then((res) => {
                const { data } = res?.payload;
                if (data) {
                    navigate('/blogs')
                }
                setFiles([])
                setContent('')
            })
        } else {
            dispatch(createblogsAsync(formData)).then((res) => {


                const { data } = res?.payload;
                if (data) {
                    navigate('/blogs')
                }
                setFiles([])
                setContent('')
            })
        }
        setSubmitting(false);
        resetForm()
    };


    return (
        <div>
            <Grid container justifyContent={'space-between'} alignItems={'center'} >
                <IconButton color="secondary" edge='start' size='large' aria-label="back" onClick={() => navigate("/blogs")}>
                    <IoMdArrowRoundBack />
                </IconButton>
                <Typography variant="h2" gutterBottom>
                    {id ? 'Edit Blog Post' : 'Create Blog Post'}
                </Typography>
            </Grid>
            <Box sx={{ margin: 'auto', paddingTop: 2 }}>
                <Formik
                    initialValues={values}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                        <Form>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        name="title"
                                        label="Title"
                                        color="secondary"
                                        error={touched.title && errors.title}
                                        helperText={touched.title && errors.title}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FieldArray name="tags">
                                        {({ push, remove, form }) => (
                                            <>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    label="Tags"
                                                    color='secondary'
                                                    fullWidth
                                                    placeholder="Enter a tag and press enter"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter' && e.target.value) {
                                                            e.preventDefault();
                                                            push(e.target.value);
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                />
                                                <Box display="flex" alignItems="center" flexWrap="wrap" mb={2}>
                                                    {form.values.tags.map((tag, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={tag}
                                                            onDelete={() => remove(index)}
                                                            style={{ margin: '0 5px 5px 0' }}
                                                        />
                                                    ))}
                                                </Box>
                                            </>
                                        )}
                                    </FieldArray>
                                </Grid>
                                <Grid item xs={12}>
                                    <AutoComplete
                                        options={cities || []}
                                        label="Select City"
                                        id="state-city"
                                        name="cityId"
                                        value={values.cityId}
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
                                    <Field
                                        as={TextareaAutosize}
                                        color="secondary"
                                        minRows={3}
                                        style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: "8px" }}
                                        name="shortNote"
                                        placeholder="Short Note"
                                    />
                                    {touched.shortNote && errors.shortNote && (
                                        <Typography color="error" variant="caption">
                                            {errors.shortNote}
                                        </Typography>
                                    )}
                                </Grid>



                                <Grid item xs={12}>
                                    <JoditEditor
                                        value={content}
                                        config={{ readonly: false }}
                                        tabIndex={1}
                                        onBlur={(newContent) => {
                                            setContent(newContent);
                                            setFieldValue('content', newContent);
                                        }}
                                    />
                                    {touched.content && errors.content && (
                                        <Typography color="error" variant="caption">
                                            {errors.content}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12} >
                                    <ImageUpload
                                        label="Upload Your Images"
                                        files={files}
                                        setFiles={handleFileChange}
                                        deleteFile={handleDeleteFile}
                                        multiple={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }} >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>

        </div>
    )
}

export default BlogForm