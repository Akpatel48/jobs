import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { showToast } from '../../utils/toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Card,
    Stack,
    Button,
    Container,
    Typography,
    ListItemIcon,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogContent,
    Box,
} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FillDetails from './Steps/FillDetails';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FillWebForm from './Steps/FillWebForm';
import CompleteAssesment from './Steps/CompleteAssesment';
import Preview from './Steps/Preview';
import { useDispatch, useSelector } from 'react-redux';
import { useCandidateApplyMutation } from '../../redux/services/main/AssesmentService';
import { useGetJobeDetailsQuery } from '../../redux/services/jobs/JobServices';
import { useAddCandidateMutation } from '../../redux/services/candidate/CandidateServices';
import dayjs from 'dayjs';
import { clearJobData } from '../../redux/job/JobReducer';
import { auth, getUserFromDatabase } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';


// const steps = ['FillDetails', 'Fill Webform', 'Complete Assesment', 'Preview'];


function JobApplication() {
    // const [userAssesment,SetUserassesment] = useState();
    
    const steps = (localStorage?.getItem("assesment") !== "null" ) ?
        ['FillDetails', 'Complete Assesment', 'Preview'] : 
        ['FillDetails', 'Preview'];

    const [userResume,SetUserResume] = useState();

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return userResume ? <FillDetails userresume={userResume}/> : <FillDetails/>;
            // case 1:
            //     return <FillWebForm />;
            case 1:
                return (localStorage?.getItem("assesment") !== "null") ? 
                    <CompleteAssesment assesmentId={userassesment} /> : 
                    <Preview userresumes={userResume}/>;
            case 2:
                return <Preview userresumes={userResume}/>;
            default:
                return 'Unknown step';
        }
    }
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams()

    const searchParams = new URLSearchParams(location.search);
    const jobtitle = searchParams.get('jobtitle');
    const jobid = searchParams.get('jobid');
    const user = searchParams.get('user');
    const userassesment =searchParams.get('assesment')
    // SetUserassesment(userassesment)
    if (jobid){

        localStorage.setItem("assesment",userassesment)
    }
    
    
    const jobName = location.state?.job_name || jobtitle;
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const webform = useSelector((state) => state.job.job)    
    const assesment = useSelector((state) => state?.assesment?.assesment)
    const candidate_id = localStorage.getItem("candidate_id")
    // console.log("assesment................."assesment);

    //firebase
    const [gettingUser,SetGettingUser] = useState(false);

    const { data, isLoading, refetch } = useGetJobeDetailsQuery(id);
    
    const job_id =jobid ? jobid : localStorage.getItem("jobId")

    

    const [candidate, AddCandidate] = useCandidateApplyMutation()
    const [createCandidate, CreateCandidateInfo] = useAddCandidateMutation()
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleNext = async () => {
        if (!isValidateCandidate()) {
            showToast('error', 'Please fill all required fields correctly.');
            return;
        }

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);


        if (activeStep === steps.length - 1) {
            const res = await createCandidate({
                job_id: job_id,
                first_name: webform?.["First Name"],
                middle_name: webform?.["Middle Name"],
                last_name: webform?.["Last Name"],
                mobile: webform?.["Phone"],
                email: webform?.["Email"],
                marital_status: webform?.["Marital Status"],
                age: webform?.["Age"],
                date_of_birth: dayjs(webform?.["Date of Birth"]).format('YYYY-MM-DD'),
            })
        }
    };

    const isValidateCandidate = () => {
        let status = true;
        const requiredFields = ['first_name', 'last_name', 'email', 'mobile', 'date_of_birth', 'street', 'country', 'state', 'city'];
        // const requiredFields = ['first_name', 'last_name', 'email', 'mobile', 'date_of_birth', 'gender', 'marital_status', 'exp_years', 'highest_qualification', 'cur_employer', 'current_job_title', 'professional_degree', 'curriculum_board', 'fun_area', 'notice_period', 'street', 'city', 'state', 'country', 'pincode'];

        const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const phoneRegExp = /^\+?\d{10,14}$/;

        requiredFields.forEach(field => {
            if (!webform[field] || (typeof webform[field] === 'string' && webform[field].trim() === '')) {
                // console.error(`Validation error in field: ${field}, Value: '${webform[field]}'`);
                status = false;
                showToast('error', `Please fill ${field.replace('_', ' ')}`);
            }
        });

        if (!emailRegExp.test(webform.email)) {
            // console.error(`Validation error in field: email, Value: '${webform.email}'`);
            status = false;
            showToast('error', 'Invalid email address');
        }

        if (webform.alternate_email && !emailRegExp.test(webform.alternate_email)) {
            // console.error(`Validation error in field: alternate_email, Value: '${webform.alternate_email}'`);
            status = false;
            showToast('error', 'Invalid alternate email address');
        }

        if (!phoneRegExp.test(webform.mobile)) {
            // console.error(`Validation error in field: mobile, Value: '${webform.mobile}'`);
            status = false;
            showToast('error', 'Invalid mobile number');
        }

        if (webform.alternate_mobile && !phoneRegExp.test(webform.alternate_mobile)) {
            // console.error(`Validation error in field: alternate_mobile, Value: '${webform.alternate_mobile}'`);
            status = false;
            showToast('error', 'Invalid alternate mobile number');
        }

        // if (webform.user_experiences && webform.user_experiences.length > 0) {
        //     webform.user_experiences.forEach((item, index) => {
        //         if (!item.field1 || item.field1.trim() === '') { // Assuming field1 is company_name
        //             // console.error(`Validation error in experience at index ${index}: company_name is empty`);
        //             status = false;
        //             showToast('error', 'Please fill company name in all experience entries');
        //         }
        //     });
        // }
        // if (webform.user_educations && webform.user_educations.length > 0) {
        //     webform.user_educations.forEach((item, index) => {
        //         if (!item.field1 || item.field1.trim() === '') { // Assuming field1 corresponds to school_name
        //             // console.error(`Validation error in education at index ${index}: school_name is empty`);
        //             status = false;
        //             showToast('error', 'Please fill school name in all education entries');
        //         }
        //     });
        // }

        return status;
    };    
    
    const handleComplete = async () => {
        const arrayWithValues = webform?.webforms?.data?.form.map(section => ({
            name: section.name,
            fields: section.fields.map(field => ({
                ...field,
                value: webform.FormData[section.name]?.[field.name] || '',
            })),
        }));
        const specificFields = {
            'First Name': webform?.["First Name"],
            'Middle Name': webform?.["Middle Name"],
            'Last Name': webform?.["Last Name"],
            'Phone': webform?.["Phone"],
            'Email': webform?.["Email"],
            'Marital Status': webform?.["Marital Status"],
            'Age': webform?.["Age"],
            'Date of Birth(yyyy-mm-dd)':dayjs(webform?.["Date of Birth(yyyy-mm-dd)"]).format('YYYY-MM-DD'),
            'Street': webform?.["Street"],
            'City': webform?.["City"],
            'State': webform?.["State"],
            'Country': webform?.["Country"],
            'Pincode': webform?.["Pincode"],
            'Experience (Years)': webform?.["Experience (Years)"],
            'Experience (Months)': webform?.["Experience (Months)"],
            'Highest Qualification': webform?.["Highest Qualification"],
            'Current Job Title': webform?.["Current Job Title"],
            'Current Employer Name': webform?.["Current Employer Name"],
            'Professional Degree': webform?.["Professional Degree"],
            'Curriculum/Board': webform?.["Curriculum/Board"],
            'Functional Area': webform?.["Functional Area"],
            'Notice Period': webform?.["Notice Period"],
            'Job Role': webform?.["Job Role"],

        };

        const extraFields = {};
        for (const key in webform) {
            if (!specificFields.hasOwnProperty(key)) {
                extraFields[key] = webform[key];
            }
        }
        // Combine specific fields and extra fields into the request payload
        const requestData = {
            job: job_id,
            // resume_user: user,
            // first_name: specificFields['First Name'],
            // middle_name: specificFields['Middle Name'],
            // last_name: specificFields['Last Name'],
            // mobile: specificFields['Phone'],
            // email: specificFields['Email'],
            // marital_status: specificFields['Marital Status'],
            // age: specificFields['Age'],
            // date_of_birth: specificFields['"Date of Birth(yyyy-mm-dd)"'],
            // street: specificFields['Street'],
            // city: specificFields['City'],
            // state: specificFields['State'],
            // country: specificFields['Country'],
            // pincode: specificFields['Pincode'],
            // exp_years: specificFields['Experience (Years)'],
            // exp_months: specificFields['Experience (Months)'],
            // highest_qualification: specificFields['Highest Qualification'],
            // current_job_title: specificFields['Current Job Title'],
            // cur_employer: specificFields['Current Employer Name'],
            // professional_degree: specificFields['Professional Degree'],
            // curriculum_board: specificFields['Curriculum/Board'],
            // fun_area: specificFields['Functional Area'],
            // notice_period: specificFields["Notice Period"],
            // job_role: specificFields["Job Role"],
            ...extraFields,
            source:"career site",
            addional_fields: [{arrayWithValues}],
            assessment_data: [assesment]
        };

        const formData = new FormData();
        // Append the JSON data as a field
        formData.append('job', requestData.job);
        formData.append('source', requestData.source);
        formData.append('first_name', webform.first_name);
        formData.append('middle_name', webform.middle_name);
        formData.append('last_name', webform.last_name);
        formData.append('mobile', webform.mobile);
        formData.append('alternate_mobile', webform.alternate_mobile);
        formData.append('email', webform.email);
        formData.append('alternate_email', webform.alternate_email);
        formData.append('gender', webform.gender);
        formData.append('marital_status', webform.marital_status);
        formData.append('bachlor_degree', webform.bachlor_degree);
        formData.append('professional_degree', webform.professional_degree);
        formData.append('date_of_birth', dayjs(webform.date_of_birth).format('YYYY-MM-DD'));
        formData.append('age', webform.age);
        formData.append('pincode', webform.pincode);
        formData.append('state', webform.state);
        formData.append('country', webform.country);
        formData.append('city', webform.city);
        formData.append('street', webform.street);
        formData.append('exp_years', webform.exp_years);
        formData.append('highest_qualification', webform.highest_qualification);
        formData.append('current_job_title', webform.current_job_title);
        formData.append('cur_employer', webform.cur_employer);
        formData.append('curriculum_board', webform.curriculum_board);
        formData.append('fun_area', webform.fun_area);
        formData.append('professional_start_date', webform.professional_start_date);
        formData.append('professional_end_date', webform.professional_end_date);
        // formData.append('subjects', JSON.stringify(formData.subjects));
        formData.append('notice_period', webform.notice_period);
        // formData.append('skills', webform.skills);
        formData.append('pipeline_stage_status', "Associated_Screening");
        formData.append('pipeline_stage', "Associated_Screening");
        formData.append('summary', webform.summary);
        formData.append("resume_id",webform.resume_id)
        formData.append("resume_user",user)
        formData.append("resume_data",webform.resume_data)
        // Append files
        if (webform?.cover_letter instanceof File) {
          formData.append('cover_letter', webform.cover_letter);
        }
        if (webform?.certificate instanceof File) {
          formData.append('certificate', webform.certificate);
        }
        if (webform?.professional_certificate instanceof File) {
          formData.append('professional_certificate', webform.professional_certificate);
        }
        
        if (webform?.resume instanceof File) {
            formData.append('resume', webform.resume);
          }
        formData.append('user_experiences', JSON.stringify(webform.user_experiences));
        formData.append('user_educations', JSON.stringify(webform.user_educations));
        formData.append('addional_fields', JSON.stringify(requestData.addional_fields));
        formData.append('assessment_data', JSON.stringify(requestData.assessment_data));
        // webform.subjects.forEach((subject, index) => {
        //   formData.append(`subjects[${index}]`, subject);
        // });

        if (webform.skills && webform.skills.length > 0) {
            webform.skills.forEach(skillId => {
              formData.append('skills', skillId);
            });
          }
          if (webform.subjects && webform.subjects.length > 0) {
            webform.subjects.forEach(subject => {
              if (subject && subject.value) {
                formData.append('subjects', subject.value);
              }
            });
          }
        
        const res = await createCandidate(formData) 

        dispatch(clearJobData());
    };

    //firebase

    
    useEffect(() => {
        if (jobid) {
        const listen = onAuthStateChanged(auth, async () => {
          if (user) {
            SetGettingUser(true);
            const userFirebase = await getUserFromDatabase(user);
            SetUserResume(userFirebase.resumes)
            // dispatch(updateUser(userFirebase));
            // initializeSavedResumes(userFirebase);
          } else {
            navigate("/");
          }
        });
    }
      }, []);
    


    useEffect(() => {
        if (AddCandidate?.isSuccess) {
            showToast('success', 'Submitted');
        }
    }, [AddCandidate])

    useEffect(() => {
        if (CreateCandidateInfo.isError) {
          toast.error('Error adding candidate, please fill all the details');
        //   showToast('error', 'Error adding candidate, please fill all the details');
        }
        if (CreateCandidateInfo.isSuccess) {
          toast.success('Successfully added candidate');
          
        const timeoutId = setTimeout(() => {
            navigate('/');
          }, 2000);
          return () => clearTimeout(timeoutId);
        
        }
      }, [CreateCandidateInfo, navigate]);

    const handleBack = () => {
        // dispatch(clearJobData()); // Dispatch the action to clear the Redux state
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleBackPage = () => {
        dispatch(clearJobData());
        navigate(-1);
    };

    return (
        <div >
            <Stack sx={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "center", // Center the content
                alignItems: "center", // Center vertically
            }}>
                <ArrowBackIcon color="secondary"
                onClick={handleBackPage}
                sx={{ cursor: "pointer", marginRight: 2 }} />
                <Typography variant="h5" component="h1" sx={{ flexGrow: 1, textAlign: "center", paddingBottom: "4px" }}>
                    {jobName}
                </Typography>
            </Stack>
            <Card>
                <div style={{ width: "60%", marginLeft: "auto", marginRight: "auto", marginTop: "2%" }}>
                    <Stepper activeStep={activeStep} sx={{ fontSize: "xx-large" }}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </div>
                    ) : (
                        <div>
                            <div>
                                {getStepContent(activeStep)}
                            </div>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginBottom: '10px', marginLeft: '5px' }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Button disabled={activeStep === 0} onClick={handleBack} style={{ marginRight: '5px' }}>
                                        Back
                                    </Button>
                                </div>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {/* <Button variant="contained" color="primary" onClick={handleNext} style={{ marginRight: '5px' }}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button> */}
                                    {activeStep === steps.length - 1 ? (
                                        <>
                                        <Button variant="contained" color="primary" onClick={handleComplete} style={{ marginRight: '5px' }}>
                                            Finish
                                        </Button>
                                       
                                        </>
                                    ) : (
                                        <Button variant="contained" color="primary" onClick={handleNext} style={{ marginRight: '5px' }}>
                                            Next
                                        </Button>
                                    )}
                                </div>
                            </Box>
                            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} sx={{ height: "10vh" }}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                    position: "absolute"
                                }} >
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    Application Succesfull!
                                </Alert>
                            </Snackbar>
                        </div>
                    )}
                </div>
            </Card>
            <ToastContainer/>
        </div>
    )
}

export default JobApplication