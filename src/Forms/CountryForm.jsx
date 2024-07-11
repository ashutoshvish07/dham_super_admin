import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { createCountryAsync, editCountryAsync, getCountryBySuperAdminAsync } from 'Redux/Slice/locationSlice';
import axios from 'axios';
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
                        <FormControl fullWidth>
                            <InputLabel color='secondary' id="country-select-label">Select Country</InputLabel>
                            <Select
                                color='secondary'
                                labelId="country-select-label"
                                id="country-select"
                                value={formik.values.country}
                                label="Select Country"
                                onChange={(e) => formik.setFieldValue('country', e.target.value)}
                                required
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country} value={country}>
                                        {country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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