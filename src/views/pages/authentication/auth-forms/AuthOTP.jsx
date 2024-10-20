import React, { useState } from 'react'
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { verifyOtpAsync } from 'Redux/Slice/authSlice';
import CustomSnackBar from 'components/Comtrol/SnackBar/CustomSnackBar';


const AuthOTP = ({ ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const email = useSelector((state) => state.auth.email);

    const [open, setOpen] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        message: '',
        severity: 'success',
    });

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <CustomSnackBar
                open={open}
                message={alertConfig.message}
                severity={alertConfig.severity}
                onClose={handleClose}
            />
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
                            const role = res.payload?.user?.role
                            if (res.payload.success && role.toLowerCase() == 'admin') {
                                navigate('/dashboard/default')
                                setAlertConfig({
                                    message: 'Log in successfully!',
                                    severity: 'success',
                                });
                                setOpen(true);
                            }
                            else if (res.payload.success && role.toLowerCase() == 'hotel') {
                                navigate('/dashboard/hotel-admin')
                            } else {
                                setAlertConfig({
                                    message: 'Invalid Otp',
                                    severity: 'error',
                                });
                                setOpen(true);
                            }

                            setSubmitting(false);
                        })
                        .catch((error) => {
                            setErrors({ submit: error.message });
                            setAlertConfig({
                                message: 'There was an error processing your request.',
                                severity: 'error',
                            });
                            setOpen(true);
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
                            <MuiOtpInput
                                name="otp"
                                autoFocus
                                sx={{ gap: { xs: "2px", sm: "12px", md: "20px", lg: "24px" } }}
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