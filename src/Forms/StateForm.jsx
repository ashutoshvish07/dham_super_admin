import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { createStateAsync, getCountryBySuperAdminAsync, updateStateAsync } from 'Redux/Slice/locationSlice';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const StateForm = (props) => {

    const { dialogProps, statedata, type } = props
    const { countries, loading, error } = useSelector(state => state.location);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountryBySuperAdminAsync({ page: 1, page_size: 100 }))
    }, []);

    console.log("statedata", statedata)

    const formik = useFormik({
        initialValues: {
            country: statedata?.countryId?._id || '',
            state: statedata?.name || "",
        },
        onSubmit: (values) => {
            if (type === "edit") {
                dispatch(updateStateAsync({ state: values.state, countryId: values.country, stateId: statedata._id }))
            } else {
                dispatch(createStateAsync({ state: values.state, countryId: values.country }))
            }
            dialogProps?.onClose();
            dispatch(getAllStateAsync({ page: 1, page_size: 10 }))
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
                                {countries?.countries?.map((country) => {
                                    return <MenuItem key={country._id} value={country._id}>
                                        {country.name}
                                    </MenuItem>
                                }
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="State Name"
                            type="text"
                            fullWidth
                            color='secondary'
                            variant="outlined"
                            value={formik.values.state}
                            onChange={(e) => formik.setFieldValue('state', e.target.value)}
                            required
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

export default StateForm