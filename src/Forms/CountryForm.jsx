import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { createCountryAsync, editCountryAsync, getCountryBySuperAdminAsync } from 'Redux/Slice/locationSlice';
import axios from 'axios';
import AutoComplete from 'components/Comtrol/AutoComplete/AutoComplete';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const CountryForm = (props) => {
    const { dialogProps, type } = props
    const [countries, setCountries] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                const countryNames = response.data.map((country) => country.name.common);
                setCountries(countryNames);
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
            });
    }, []);




    const formik = useFormik({
        initialValues: {
            country: props.countrydata?.name || '',
        },
        onSubmit: (values) => {
            if (type == "edit") {
                dispatch(editCountryAsync({ name: values.country, id: props.countrydata?._id }))
            } else {
                dispatch(createCountryAsync({ name: values.country }))
            }
            dispatch(getCountryBySuperAdminAsync({ page: 1, page_size: 10 }))
            dialogProps?.onClose();
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <AutoComplete
                            options={countries}
                            label="Choose a country"
                            id="country-select"
                            name="country"
                            value={formik.values.country}
                            onChange={(newValue) => formik.setFieldValue('country', newValue)}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                            required
                            color="secondary"
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }} >
                    <Button type="submit" variant='outlined' color='secondary' size='medium'>Submit</Button>
                </Box>
            </form>
        </div>
    )
}

export default CountryForm