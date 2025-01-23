import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useFormik as useForm, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// material
import { Stack, TextField, IconButton, InputAdornment, Divider, Select, MenuItem } from '@mui/material';
import { LoadingButton} from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useAddRegisterMutation } from '../../../redux/services/register/registerService';
import { authTokenAction, authAction } from '../../../redux/auth/AuthReducer';
import { showToast } from '../../../utils/toast';
import { useGetCountryQuery, useGetStateQuery, useGetCityQuery } from "../../../redux/services/settings/CountryStateCityService";


export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {data: countryData} = useGetCountryQuery()
  const [country, setCountry] = useState(1)
  const {data: stateData, refetch: stateDataRefetch} = useGetStateQuery(country)
  const [currentState, setCurrentState] = useState(1)
  const {data: cityData, refetch: cityDataRefetch} = useGetCityQuery(currentState)
  const [city, setCity] = useState(1)
  const handleChangeCountry = (e) => {
    setCountry(e.target.value)
    stateDataRefetch()
    cityDataRefetch()
  }
  const handleChangeState = (e) => {
    setCurrentState(e.target.value)
    cityDataRefetch()
  }
  const handleChangeCity = (e) => setCity(e.target.value)

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [AddRegister, AddRegisterInfo] = useAddRegisterMutation();
  
  // const [availableCities, setAvailableCities] = useState([]);

  
  if (AddRegisterInfo.isError) {
    showToast("error", AddRegisterInfo.error.data.msg);
    AddRegisterInfo.reset();
  }
  const successToast = async () => {
    await showToast("success", "Welcome to Edjobster!!")
  }
  
  

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Re-enter your Password'),
    companyName: Yup.string().required("Company Name is required").min(5, "Too Short!"),
    address: Yup.string().required("Address is required").min(10, "Too Short!"),
    landmark: Yup.string().required("Address is required").min(5, "Too Short!"),
    city: Yup.number().required("City is required"),
    state: Yup.number().required("State is required"),
    country: Yup.number().required("Country is required"),
    pincode: Yup.string().matches(/^[1-9][0-9]{5}$/, "Pincode is invalid").required("Pincode is required"),
  });

  const formData = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile:'',
      companyName: '',
      password: '',
      confirmPassword: '',
      address: '',
      landmark: '',
      country: 1,
      state: 1,
      city: 1,
      pincode: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      AddRegister({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        mobile: values.mobile,
        
        company: values.companyName,
        address: values.address,
        landmark: values.landmark,
        city: values.city,
        pincode: values.pincode,
        state: values.state,
        country: values.country
      })
      dispatch(authAction(true))
      // navigate('/dashboard', { replace: true });
    },
    validateOnChange: (data) => console.log(data)
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setSubmitting } = formData;

  useEffect(() => {
    if (AddRegisterInfo.isSuccess) {
      setSubmitting(false)
      dispatch(authTokenAction(AddRegisterInfo.data.access));
      navigate('/login', { replace: true });
    }
    if(AddRegisterInfo.isError) {
      setSubmitting(false)
      console.log(AddRegisterInfo.error.message)
    }
  }, [AddRegisterInfo, dispatch, navigate, setSubmitting])

  return (
    <FormikProvider value={formData}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

          <Divider orientation="horizontal" flexItem>
            Personal Details
          </Divider>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            type="number"
            length={10}
            label="Phone Number"
            {...getFieldProps('mobile')}
            error={Boolean(touched.mobile && errors.mobile)}
            helperText={touched.mobile && errors.mobile}
          />

          <Divider orientation="horizontal" flexItem>
            Address
          </Divider>
          <TextField
            fullWidth
            autoComplete="companyName"
            type="string"
            label="Company Name"
            {...getFieldProps('companyName')}
            error={Boolean(touched.companyName && errors.companyName)}
            helperText={touched.companyName && errors.companyName}
          />
          <TextField
            fullWidth
            autoComplete="address"
            type="string"
            label="Address"
            {...getFieldProps('address')}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />
          <TextField
            fullWidth
            autoComplete="landmark"
            type="string"
            label="Landmark"
            {...getFieldProps('landmark')}
            error={Boolean(touched.landmark && errors.landmark)}
            helperText={touched.landmark && errors.landmark}
          />
          <TextField
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Age"
            type={"number"}
          />
          {/* <TextField
            fullWidth
            autoComplete="country"
            type="string"
            label="Country"
            select
            {...getFieldProps('country')}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
            SelectProps={{
              native: true,
            }}
            value={country}
            onChange={handleChangeCountry}
          >
            <option 
              value={0} 
              style={{
                fontStyle: "italic"
              }}
            >
              Country
            </option>
            {countryData.countries.map((e, i) => (
              <option key={i} value={e.id}>
                {e.name}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            autoComplete="state"
            type="string"
            label="State"
            select
            {...getFieldProps('state')}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
            onChange={handleChangeState}
            SelectProps={{
              native: true,
            }}
            value={currentState}
          >
            <option 
              value={0} 
              style={{
                fontStyle: "italic"
              }}
            >
              State
            </option>
            {stateData.states.map((e, i) => (
              <option key={i} value={e.id}>
                {e.name}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            autoComplete="city"
            type="string"
            label="City"
            select
            {...getFieldProps('city')}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
            onChange={handleChangeCity}
            SelectProps={{
              native: true,
            }}
            value={city}
          >
            <option 
              value={0} 
              style={{
                fontStyle: "italic"
              }}
            >
              City
            </option>
            {cityData.cities.map((e, i) => (
              <option key={i} value={e.id}>
                {e.name}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            autoComplete="pincode"
            type="number"
            label="Pincode"
            {...getFieldProps('pincode')}
            error={Boolean(touched.pincode && errors.pincode)}
            helperText={touched.pincode && errors.pincode}
          /> */}

          <Divider orientation="horizontal" flexItem>
            Password
          </Divider>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
