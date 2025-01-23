import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/system";
import { 
    School as SchoolIcon, 
    Person as PersonIcon, 
    Email as EmailIcon, 
    Phone as PhoneIcon, 
    Language as LanguageIcon, 
    AttachFile as AttachFileIcon 
  } from "@mui/icons-material";
import Navbar from "../components/Navbar";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "2rem",
  marginTop: "2rem",
  marginBottom: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "1.5rem",
  padding: "0.75rem 2rem",
  borderRadius: "8px",
  fontWeight: "bold"
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: "2rem"
}));

const CandidateRegistrationForm = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    phone: "",
    schoolBoard: "",
    schoolType: "",
    studentStrength: "",
    website: "",
    requirement: "",
    referralSource: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    attachment: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !emailRegex.test(value) ? "Invalid email address" : "";
        break;
      case "phone":
        const phoneRegex = /^[1-9]\d{9}$/;
        error = !phoneRegex.test(value) ? "Invalid phone number (10 digits without +91 or 0)" : "";
        break;
      case "zipCode":
        const zipRegex = /^\d{6}$/;
        error = !zipRegex.test(value) ? "Invalid ZIP code (6 digits)" : "";
        break;
      default:
        error = !value && name !== "website" && name !== "attachment" ? "This field is required" : "";
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) formErrors[key] = error;
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form submitted:", formData);
        alert("Registration successful!");
      } catch (error) {
        console.error("Submission error:", error);
        alert("Registration failed. Please try again.");
      }
    }

    setIsSubmitting(false);
  };

  return (
      <Container maxWidth="md">
        <Navbar/>
        <StyledPaper elevation={3} sx={{ mt: 12 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold", color: "primary.main" }}>
            {/* <SchoolIcon style={{ marginRight: "10px" }} /> */}
                Registration
            </Typography>

            <form onSubmit={handleSubmit}>
            <FormSection>
                <Typography variant="h6" gutterBottom color="primary">
                    Personal Details
                </Typography>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Middle Name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    error={!!errors.middleName}
                    helperText={errors.middleName}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Alternative Email"
                    name="alternativeEmail"
                    value={formData.alternativeEmail}
                    onChange={handleChange}
                    error={!!errors.alternativeEmail}
                    helperText={errors.alternativeEmail}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Mobile"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Alternate Mobile"
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={handleChange}
                    error={!!errors.alternateMobile}
                    helperText={errors.alternateMobile}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    error={!!errors.age}
                    helperText={errors.age}
                    required
                    InputProps={{
                        inputProps: { 
                            min: 18,
                            max: 100
                        }
                    }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="DOB"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    error={!!errors.dob}
                    helperText={errors.dob}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        label="Gender"
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                    <FormHelperText>{errors.gender}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!errors.maritalStatus}>
                    <InputLabel>Marital Status</InputLabel>
                    <Select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        label="Marital Status"
                    >
                        <MenuItem value="single">Single</MenuItem>
                        <MenuItem value="married">Married</MenuItem>
                        <MenuItem value="divorced">Divorced</MenuItem>
                    </Select>
                    <FormHelperText>{errors.maritalStatus}</FormHelperText>
                    </FormControl>
                </Grid>
                </Grid>
            </FormSection>

            <FormSection>
                <Typography variant="h6" gutterBottom color="primary">
                    Professional Details
                </Typography>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!errors.experienceYears}>
                    <InputLabel>Experience (in years)</InputLabel>
                    <Select
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleChange}
                        label="Experience (in years)"
                    >
                        {/* Add options for years */}
                        <MenuItem value="0">0</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        {/* Add more options as needed */}
                    </Select>
                    <FormHelperText>{errors.experienceYears}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!errors.experienceMonths}>
                    <InputLabel>Experience (in months)</InputLabel>
                    <Select
                        name="experienceMonths"
                        value={formData.experienceMonths}
                        onChange={handleChange}
                        label="Experience (in months)"
                    >
                        {/* Add options for months */}
                        <MenuItem value="0">0</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        {/* Add more options as needed */}
                    </Select>
                    <FormHelperText>{errors.experienceMonths}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!errors.highestQualification}>
                    <InputLabel>Highest Qualification Held</InputLabel>
                    <Select
                        name="highestQualification"
                        value={formData.highestQualification}
                        onChange={handleChange}
                        label="Highest Qualification Held"
                    >
                        {/* Add options for qualifications */}
                        <MenuItem value="bachelor">Bachelor's</MenuItem>
                        <MenuItem value="master">Master's</MenuItem>
                        <MenuItem value="phd">PhD</MenuItem>
                        {/* Add more options as needed */}
                    </Select>
                    <FormHelperText>{errors.highestQualification}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Professional Degree"
                    name="professionalDegree"
                    value={formData.professionalDegree}
                    onChange={handleChange}
                    error={!!errors.professionalDegree}
                    helperText={errors.professionalDegree}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Professional Certificate"
                    name="professionalCertificate"
                    value={formData.professionalCertificate}
                    onChange={handleChange}
                    error={!!errors.professionalCertificate}
                    helperText={errors.professionalCertificate}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!errors.functionalArea}>
                    <InputLabel>Functional Area</InputLabel>
                    <Select
                        name="functionalArea"
                        value={formData.functionalArea}
                        onChange={handleChange}
                        label="Functional Area"
                    >
                        {/* Add options for functional areas */}
                        <MenuItem value="it">IT</MenuItem>
                        <MenuItem value="hr">HR</MenuItem>
                        <MenuItem value="finance">Finance</MenuItem>
                        {/* Add more options as needed */}
                    </Select>
                    <FormHelperText>{errors.functionalArea}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Current Job Role"
                    name="currentJobRole"
                    value={formData.currentJobRole}
                    onChange={handleChange}
                    error={!!errors.currentJobRole}
                    helperText={errors.currentJobRole}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Current Employer"
                    name="currentEmployer"
                    value={formData.currentEmployer}
                    onChange={handleChange}
                    error={!!errors.currentEmployer}
                    helperText={errors.currentEmployer}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Curriculum"
                    name="curriculum"
                    value={formData.curriculum}
                    onChange={handleChange}
                    error={!!errors.curriculum}
                    helperText={errors.curriculum}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Subjects (If Teaching)"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleChange}
                    error={!!errors.subjects}
                    helperText={errors.subjects}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="LinkedIn URL"
                    name="linkedInUrl"
                    value={formData.linkedInUrl}
                    onChange={handleChange}
                    error={!!errors.linkedInUrl}
                    helperText={errors.linkedInUrl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Current Salary"
                    name="currentSalary"
                    value={formData.currentSalary}
                    onChange={handleChange}
                    error={!!errors.currentSalary}
                    helperText={errors.currentSalary}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Expected Salary"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    error={!!errors.expectedSalary}
                    helperText={errors.expectedSalary}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!errors.noticePeriod}>
                    <InputLabel>Notice Period</InputLabel>
                    <Select
                        name="noticePeriod"
                        value={formData.noticePeriod}
                        onChange={handleChange}
                        label="Notice Period"
                    >
                        {/* Add options for notice periods */}
                        <MenuItem value="0">0</MenuItem>
                        <MenuItem value="1">1 Month</MenuItem>
                        <MenuItem value="2">2 Months</MenuItem>
                        {/* Add more options as needed */}
                    </Select>
                    <FormHelperText>{errors.noticePeriod}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Skill Set"
                    name="skillSet"
                    value={formData.skillSet}
                    onChange={handleChange}
                    error={!!errors.skillSet}
                    helperText={errors.skillSet}
                    multiline
                    rows={3}
                    />
                </Grid>
                </Grid>
            </FormSection>

            <FormSection>
                <Typography variant="h6" gutterBottom color="primary">
                Address
                </Typography>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    error={!!errors.address}
                    helperText={errors.address}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    error={!!errors.state}
                    helperText={errors.state}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="ZIP/Pin Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    error={!!errors.zipCode}
                    helperText={errors.zipCode}
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    error={!!errors.country}
                    helperText={errors.country}
                    required
                    />
                </Grid>
                </Grid>
            </FormSection>

            <FormSection>
                <Typography variant="h6" gutterBottom color="primary">
                Attachment
                </Typography>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Button
                    variant="outlined"
                    component="label"
                    >
                    Upload Resume
                    <input
                        type="file"
                        name="resume"
                        // onChange={handleFileChange}
                        hidden
                    />
                    </Button>
                    {formData.resume && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Selected file: {formData.resume.name}
                    </Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                    variant="outlined"
                    component="label"
                    >
                    Upload Degree
                    <input
                        type="file"
                        name="degree"
                        // onChange={handleFileChange}
                        hidden
                    />
                    </Button>
                    {formData.degree && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Selected file: {formData.degree.name}
                    </Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                    variant="outlined"
                    component="label"
                    >
                    Upload Certificate
                    <input
                        type="file"
                        name="certificate"
                        // onChange={handleFileChange}
                        hidden
                    />
                    </Button>
                    {formData.certificate && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Selected file: {formData.certificate.name}
                    </Typography>
                    )}
                </Grid>
                </Grid>
            </FormSection>

            <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
                ) : (
                "Submit Registration"
                )}
            </StyledButton>
            </form>
        </StyledPaper>
        </Container>
  );
};

export default CandidateRegistrationForm;
