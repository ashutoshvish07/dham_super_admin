import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { FieldArray } from 'formik';

const PlanComponent = ({ formik }) => {
    return (
        <FieldArray name="plans">
            {({ push, remove }) => (
                <>
                    {formik.values.plans.map((plan, index) => (
                        <Grid container spacing={2} key={index}>
                            {/* Day */}
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    label={`Day ${index + 1}`}
                                    name={`plans[${index}].day`}
                                    value={plan.day}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.plans &&
                                        formik.touched.plans[index] &&
                                        formik.touched.plans[index].day &&
                                        Boolean(formik.errors.plans?.[index]?.day)
                                    }
                                    helperText={
                                        formik.touched.plans &&
                                        formik.touched.plans[index] &&
                                        formik.touched.plans[index].day &&
                                        formik.errors.plans?.[index]?.day
                                    }
                                />
                            </Grid>

                            {/* Destination */}
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Destination"
                                    name={`plans[${index}].destination`}
                                    value={plan.destination}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.plans &&
                                        formik.touched.plans[index] &&
                                        formik.touched.plans[index].destination &&
                                        Boolean(formik.errors.plans?.[index]?.destination)
                                    }
                                    helperText={
                                        formik.touched.plans &&
                                        formik.touched.plans[index] &&
                                        formik.touched.plans[index].destination &&
                                        formik.errors.plans?.[index]?.destination
                                    }
                                />
                            </Grid>

                            {/* Description */}
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name={`plans[${index}].description`}
                                    value={plan.description}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.plans &&
                                        formik.touched.plans[index] &&
                                        formik.touched.plans[index].description &&
                                        Boolean(formik.errors.plans?.[index]?.description)
                                    }
                                    helperText={
                                        formik.touched.plans &&
                                        formik.touched.plans[index] &&
                                        formik.touched.plans[index].description &&
                                        formik.errors.plans?.[index]?.description
                                    }
                                />
                            </Grid>

                            {/* Remove Button */}
                            <Grid item xs={1}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => remove(index)} // Remove the current plan
                                    disabled={formik.values.plans.length === 1} // Disable if only one plan
                                >
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    ))}

                    {/* Add Plan Button */}
                    <Grid item xs={12} style={{ marginTop: '16px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                push({ day: '', destination: '', description: '' }) // Add an empty plan object
                            }
                        >
                            Add Plan
                        </Button>
                    </Grid>
                </>
            )}
        </FieldArray>
    );
};

export default PlanComponent;
