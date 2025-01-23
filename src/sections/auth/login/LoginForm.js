import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useAddLoginMutation } from '../../../redux/services/login/LoginService';
import { authTokenAction, authAction } from '../../../redux/auth/AuthReducer';
import { showToast } from '../../../utils/toast';

// ----------------------------------------------------------------------
const customId = "custom-id-yes";
export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [AddLogin, AddLoginInfo] = useAddLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const successToast = async () => {
    await showToast("success", "Welcome to edjobster !! ")
  }

  const errorToast = async () => {
    await showToast("error", "Invalid username and password !! ");
  };
  
  const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await AddLogin({
        username: values.username,
        password: values.password
      })
      dispatch(authAction(true));

    },
  });

  const { errors, touched, values, isSubmitting, handleChange, handleSubmit, getFieldProps, resetForm, initialValues, setSubmitting } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  useEffect(() => {
    const handleLoginResponse = async () => {
      setSubmitting(false)
      if (AddLoginInfo.isError) {
        await errorToast();
        resetForm(initialValues);
      }
      if (AddLoginInfo.isSuccess) {
        dispatch(authTokenAction(AddLoginInfo.data.access));
        localStorage.setItem("globalUser", JSON.stringify(AddLoginInfo.data))
        sessionStorage.setItem("globalUser", JSON.stringify(AddLoginInfo.data))
        await successToast();
        navigate('/all-company', { replace: true });  
      }
    };
    handleLoginResponse();
  }, [AddLoginInfo, dispatch, initialValues, navigate, resetForm, setSubmitting])

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              value={values.username}
              onChange={handleChange}
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
              Forgot password?
            </Link>
          </Grid>
        </Grid>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={AddLoginInfo.isLoading && isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
