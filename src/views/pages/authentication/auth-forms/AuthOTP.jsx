import React, { useState } from 'react'
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { verifyOtpAsync } from 'Redux/Slice/authSlice';


const AuthOTP = ({ ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const email = useSelector((state) => state.auth.email);
    console.log("email", email)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Formik
                initialValues={{
                    email: email,
                    otp: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    otp: Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required')
                })}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    dispatch(verifyOtpAsync({ email: values.email, otp: values.otp }))
                        .then((res) => {
                            if (res.payload.success) {
                                navigate('/dashboard/default')
                            }
                            setSubmitting(false);
                        })
                        .catch((error) => {
                            setErrors({ submit: error.message });
                            setSubmitting(false);
                        });
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address "
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                            {/* <InputLabel htmlFor="outlined-adornment-password-login">Enter OTP</InputLabel> */}
                            {/* <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            /> */}
                            <MuiOtpInput
                                name="otp"
                                autoFocus
                                value={values.otp}
                                onChange={(newValue) => {
                                    handleChange({ target: { name: 'otp', value: newValue } });
                                }}
                                onBlur={handleBlur}
                                length={6} />

                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default AuthOTP