import { Box, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { createFoodandDiningAsync, getAllFoodAndDiningAsync, updateFoodAndDiningAsync } from 'Redux/Slice/hotelSlice';
import * as Yup from 'yup';


const FoodAndDiningForm = (props) => {
    const { dialogProps, guid_data, edit } = props;


    const dispatch = useDispatch()



    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            name: guid_data?.name || '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const formData = new FormData()
            formData.append("name", values.name)

            if (edit) {
                dispatch(updateFoodAndDiningAsync({ formData: formData, id: guid_data?._id, })).then(() => {
                    dispatch(getAllFoodAndDiningAsync({ page: 1, page_size: 10 }))
                })
            }
            else {
                dispatch(createFoodandDiningAsync(formData)).then(() => {
                    dispatch(getAllFoodAndDiningAsync({ page: 1, page_size: 10 }))
                })
            }
            dialogProps.onClose()

        },
    });
    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
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

export default FoodAndDiningForm