import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createAmenitiesAsync } from 'Redux/Slice/hotelSlice';

const AmenitiesForm = (props) => {

    const [selectedImage, setSelectedImage] = useState(null);

    const dispatch = useDispatch()

    const handleImageUpload = (event) => {
        const file = event.currentTarget.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleSubmit = (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        debugger
        if (values.image) {
            formData.append('file', values.image);
        }

        // Display FormData content for testing
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        dispatch(createAmenitiesAsync(formData))

        // Handle form submission, e.g., send formData to the server
        // Example: axios.post('/api/upload', formData);
        props.dialogProps.onClose()
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{ name: '', file: null }}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue }) => (
                <Form>
                    <Box mb={2}>
                        <Field name="name">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        </Field>
                    </Box>
                    <Box mb={2}>
                        <Button
                            variant="contained"
                            component="label"
                            color='secondary'
                        >
                            Upload Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(event) => {
                                    handleImageUpload(event);
                                    setFieldValue('image', event.currentTarget.files[0]);
                                }}
                            />
                        </Button>
                    </Box>
                    {selectedImage && (
                        <Box mb={2}>
                            <img src={selectedImage} alt="Preview" width="100" />
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button type="submit" variant="outlined" color="secondary" size="medium">
                            Submit
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default AmenitiesForm