import { Box, Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createRoomCateAsync, getRoomCateAsync, updateRoomCateAsync } from 'Redux/Slice/hotelSlice';


const HotelCategoriesForm = ({ dialogProps, catdata, type }) => {


    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: catdata?.name || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('name is required'),
        }),
        onSubmit: (values) => {
            if (type === "edit") {
                dispatch(updateRoomCateAsync({ id: catdata?._id, name: values?.name })).then(() => {
                    dispatch(getRoomCateAsync())
                })
            } else {
                dispatch(createRoomCateAsync({ name: values?.name })).then(() => {
                    dispatch(getRoomCateAsync())
                })
            }
            dialogProps.onClose()
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Category Name"
                            color='secondary'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>

                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button type="submit" variant="outlined" color="secondary" size="medium">
                        Submit
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default HotelCategoriesForm