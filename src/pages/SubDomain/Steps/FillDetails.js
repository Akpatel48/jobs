import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { jobAction } from "../../../redux/job/JobReducer";

import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Stack,
  Button,
  TextField,
  Container,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Input,
  TextareaAutosize,
  Grid,
  Typography,
  Checkbox,
  Card,
  Box,
  Backdrop,
  FormHelperText,
  Autocomplete
} from '@mui/material';
import { Select as AntSelect } from 'antd';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik as useForm, Form, FormikProvider } from 'formik';
// eslint-disable-next-line import/no-unresolved
import { showToast } from '../../../../src/utils/toast';
import { MultiSelect } from "react-multi-select-component";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import {
  useAddCandidateMutation,
   useGetCandidateByIdQuery,
  useAddCandidateWithResumeMutation,
  useAddParseResumeMutation,
} from '../../../redux/services/candidate/CandidateServices';
import {
  useGetCountryQuery,
  useGetStateQuery,
  useGetCityQuery,
} from '../../../redux/services/settings/CountryStateCityService';
import { useGetAssesmentQuery } from '../../../redux/services/main/AssesmentService';
import { useGetJobListQuery } from '../../../redux/services/jobs/JobListService';
import Back from '../../../assets/images/back.svg';
import { apiUrl } from '../../../utils/api';
import { useDesignationCareerGetQuery } from '../../../redux/services/settings/DesignationService';
import { useGetSkillListQuery, useGetSubjectListQuery } from '../../../redux/services/settings/SkillServices';
import { useDegreeCareerGetQuery } from '../../../redux/services/settings/DegreeService';
import ResumeSelectorModal from '../../ResumeSelectorModal';

function FillDetails({ disabled = false, userresume, resume, setResume }) {
  const { editCandidateId } = useParams();
  // console.log("editCandidateId", editCandidateId)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const webformDatafilledRedux = useSelector((state) => state?.job?.job)
  const [isLoading, setIsLoading] = useState(false);
  const candidate = useSelector((state) => state.candidate);
  // console.log('This is candidate', candidate);
  const [AddCandidate, AddCandidateInfo] = useAddCandidateMutation();
  const { data: designationData, refetch: getDesignationDataRefetch } = useDesignationCareerGetQuery()
  const { data: skillData, refetch: getSkillDataRefetch } = useGetSkillListQuery()
  const { data: subjectData, refetch: getSubjectDataRefetch } = useGetSubjectListQuery()
  const { data: degreeData, refetch: getDegreeDataRefetch } = useDegreeCareerGetQuery()
//   const { data: candidateData, refetch: getRefetch } = useGetCandidateByIdQuery(editCandidateId, { skip: editCandidateId === undefined });
//   console.log("Candidate DATA INFO", candidateData)
  const [touchedFields, setTouchedFields] = useState({});
  const [isCurrentJob, setIsCurrentJob] = useState(false);
  const [value, setValue] = React.useState(dayjs('2000-08-18'));
  const [professionalStartDate, setProfessionalStartDate] = React.useState(null);
  const [professionalEndDate, setProfessionalEndDate] = React.useState(null);
  const [experienStartDate, setExperirnceStartDate] = React.useState(dayjs('2000-08-18'));
  const [experienEndDate, setExperirnceEndDate] = React.useState(dayjs('2000-08-18'));
  const [educationStartDate, setEducationStartDate] = React.useState(dayjs('2000-08-18'));
  const [educationEndDate, setEducationEndDate] = React.useState(dayjs('2000-08-18'));
  const [birthvalue, setbirthValue] = React.useState(dayjs('2000-08-18').format('YYYY-MM-DD'));
  const [admissionvalue, setadmissionValue] = React.useState(dayjs('2019-08-18'));
  const [graduationvalue, setgraduationValue] = React.useState(dayjs('2023-08-18'));
  const [showTextField, setShowTextField] = useState(false);
  const [experienceCount, setExperienceCount] = useState(1);
  const [experienceArray, setExperienceArray] = useState(webformDatafilledRedux?.user_experiences || [{ field1: '', field2: '', field3: '', field4: null, field5: null }]);
  const [educationCount, setEducationCount] = useState(1);
  const [educationArray, setEducationArray] = useState(webformDatafilledRedux?.user_educations || [{ field1: '', field2: '', field3: '', field4: null, field5: null }]);
  const [selected, setSelected] = useState(webformDatafilledRedux.selectedOptions || []);
  const [piplineStatus, setPiplineStatus] = useState('')
  const [professionalDegreeOptions, setProfessionalDegreeOptions] = useState([
    'B.Ed.',
    'D.Ed.',
    'Diploma',
    'B.E',
    'B.Arch',
    'MBBS',
    'Other',
  ]);
  const [educationalDegreeOptions, setEducationalDegreeOptions] = useState([
    'B.Ed.',
    'D.Ed.',
    'Diploma',
    'B.E',
    'B.Arch',
    'MBBS',
    'Other',
  ]);
  const [qualificationOptions, setQualificationOptions] = useState([
    'Secondary_School',
    'High_School',
    'Diploma',
    'Post_Graduate_Diploma',
    'Graduate',
    'Post_Graduate',
    'Doctorate',
  ]);
  const [educationBoardOptions, setEducationBoardOptions] = useState([
    'ICSE',
    'CBSE',
    'STATE_BOARD',
    'IGCSE',
    'IB',
    'OTHER',
    'NONE',
  ]);
  const [jobRoleOptions, setJobRoleOptions] = useState([
    'Teaching',
    'Administer',
    'Manager',
    'head_of_department',
    'Coordinator',
    'OTHER',
  ]);
  const [noticePeriodOptions, setNoticePeriodOptions] = useState([
    'Immediate joining',
    '15_days',
    '1_month',
    '2_months',
    '3_months',
    '4_months',
    '5_months',
    '6_months',
  ]);

  const options = [
    { label: "English", value: "English" },
    { label: "Hindi", value: "Hindi" },
    { label: "Science", value: "Science" },
    { label: "Social Science", value: "Social Science" },
    { label: "Other", value: "Other" },
  ];

  // resume shaper
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [isResumeLoading, setIsResumeLoading] = useState(false); // New state for loading resumes


  const [countryId, setCountryId] = useState(skipToken);
  const [stateId, setStateId] = useState(skipToken);

  const handleFieldTouch = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleCurrentJobChange = (event) => {
    setIsCurrentJob(event.target.checked);
    if (event.target.checked) {
      setProfessionalEndDate(null); 
    }
  };

  const handleRemoveForm = () => {
    if (experienceArray.length > 1) {
        setExperienceArray(experienceArray.slice(0, -1));
    } else {
        alert("Cannot remove the last experience entry.");
    }
  };

  const handleEducationRemoveForm = () => {
    if (educationArray.length > 1) {
        setEducationArray(educationArray.slice(0, -1));
    }
  };

  const handleAddForm = () => {
    setExperienceCount(experienceCount + 1);
    setExperienceArray([...experienceArray, { field1: '', field2: '', field3: '', field4: dayjs('2000-08-18'), field5: dayjs('2000-08-18') }]);
  };

  // const handleFormChange = (index, field, value) => {
  //   const updatedForms = [...experienceArray];
  //   updatedForms[index][field] = value;
  //   setExperienceArray(updatedForms);
  // };

  const handleFormChange = (index, field, value) => {
    setExperienceArray((prevArray) => {
      const updatedForms = [...prevArray];
      updatedForms[index] = {
        ...updatedForms[index],
        [field]: value,
      };
      return updatedForms;
    });
  };

  useEffect(() => {
    setNewFormData((prev) => ({
      ...prev,
      user_experiences: experienceArray,
    }));
  }, [experienceArray]);


  const handleEducationAddForm = () => {
    setEducationCount(educationCount + 1);
    setEducationArray([...educationArray, { field1: '', field2: '', field3: '', field4: dayjs('2000-08-18'), field5: dayjs('2000-08-18') }]);
  };


  const handleEducationFormChange = (index, field, value) => {
    setEducationArray((prevArray) => {
      const updatedForms = [...prevArray];
      updatedForms[index] = {
        ...updatedForms[index],
        [field]: value,
      };
      return updatedForms;
    });
  };

  useEffect(() => {
    setNewFormData((prev) => ({
      ...prev,
      user_educations: educationArray,
    }));
  }, [educationArray]);

  const handleMultiSelectChange = (selectedOptions) => {
    setSelected(selectedOptions);

    // Extract only the values from the selected options
    const selectedValues = selectedOptions.map(option => option.value);

    // Update the newFormData object
    setNewFormData({
      ...newFormData,
      subjects: selectedValues,
      selectedOptions:selectedOptions
    });
  };

  // const options = ["English","Hindi","Maths","Science","Social Science","Computer Science","Other"]

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleChangeBirth = (newValue) => {
    setbirthValue(newValue ? newValue.format('YYYY-MM-DD') : '');
  };

  const handleChangeExperienceStartDate = (index, field, newValue) => {
    const updateDate = `${newValue.get('year')}-${String(newValue.get('month') + 1).padStart(2, 0)}-${String(
      newValue.get('date')
    ).padStart(2, 0)}`

    const updatedExperienceArray = [...experienceArray];
    updatedExperienceArray[index] = {
      ...updatedExperienceArray[index],
      field4: updateDate,
    };
    setExperienceArray(updatedExperienceArray);
  };

  const handleChangeExperienceEndDate = (index, field, newValue) => {
    const updateDate = `${newValue.get('year')}-${String(newValue.get('month') + 1).padStart(2, 0)}-${String(
      newValue.get('date')
    ).padStart(2, 0)}`

    const updatedExperienceArray = [...experienceArray];
    updatedExperienceArray[index] = {
      ...updatedExperienceArray[index],
      field5: updateDate,
    };
    setExperienceArray(updatedExperienceArray);
  };

  const handleChangeEducationStartDate = (index, field, newValue) => {
    const updateDate = `${newValue.get('year')}-${String(newValue.get('month') + 1).padStart(2, 0)}-${String(
      newValue.get('date')
    ).padStart(2, 0)}`

    const updatedEducationArray = [...educationArray];
    updatedEducationArray[index] = {
      ...updatedEducationArray[index],
      field4: updateDate,
    };
    setEducationArray(updatedEducationArray);
  };

  const handleChangeEducationEndDate = (index, field, newValue) => {
    const updateDate = `${newValue.get('year')}-${String(newValue.get('month') + 1).padStart(2, 0)}-${String(
      newValue.get('date')
    ).padStart(2, 0)}`

    const updatedEducationArray = [...educationArray];
    updatedEducationArray[index] = {
      ...updatedEducationArray[index],
      field5: updateDate,
    };
    setEducationArray(updatedEducationArray);
  };

  const handleChangeProfessionalStartDate = (newValue) => {
    setProfessionalStartDate(newValue);
  };

  const handleChangeProfessionalEndDate = (newValue) => {
    setProfessionalEndDate(newValue);
  };

  const handleChangeAdmission = (newValue) => {
    setadmissionValue(newValue);
    // console.log('changed admission');
  };
  const handleChangeGraduation = (newValue) => {
    setgraduationValue(newValue);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
 
  const { data: assessmentData, refetch: assessmentDataRefetech } = useGetAssesmentQuery();
  const [assessment, setAssessment] = useState(1);
  const handleChangeAssessment = (e) => setAssessment(e.target.value);
  const [UploadedFileName, setUploadedFileName] = useState('');
  const [Uploaded, setUploaded] = useState(false);

  // const { data: jobData, refetch: jobDataRefetch } = useGetJobListQuery();
  // console.log("get all job list", jobData)
  const [job, setJob] = useState(0);
  const handleChangeJob = (e) => setJob(e.target.value);
  
  const { data: countryData, refetch: countryDataRefetch } = useGetCountryQuery();
  const { data: stateData, refetch: stateDataRefetch } = useGetStateQuery(countryId);
  const { data: cityData, refetch: cityDataRefetch } = useGetCityQuery(stateId);

  useEffect(() => {
    if (countryData && webformDatafilledRedux?.country) {
      const selectedCountry = countryData.countries.find(country => country.id === webformDatafilledRedux.country);
      setCountryId(selectedCountry ? selectedCountry.id : skipToken);
    }
  }, [countryData, webformDatafilledRedux]);

  useEffect(() => {
    if (stateData && webformDatafilledRedux?.state) {
      const selectedState = stateData.states.find(state => state.id === webformDatafilledRedux.state);
      setStateId(selectedState ? selectedState.id : skipToken);
    }
  }, [stateData, webformDatafilledRedux]);

  const [newFormData, setNewFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    mobile: '',
    alternate_mobile: '',
    email: '',
    alternate_email: '',
    gender: '',
    marital_status: '',
    bachlor_degree: '',
    professional_degree: '',
    date_of_birth:'',
    age: '',
    pincode: '',
    street: '',
    state:'',
    city: '',
    country: '',
    exp_years: '',
    highest_qualification: '',
    current_job_title: '',
    cur_employer:'',
    professional_certificate: '',
    curriculum_board: '',
    fun_area:'',
    professional_start_date: `${value.get('year')}-${String(value.get('month') + 1).padStart(2, 0)}-${String(
      value.get('date')
    ).padStart(2, 0)}`,
    professional_end_date: `${value.get('year')}-${String(value.get('month') + 1).padStart(2, 0)}-${String(
      value.get('date')
    ).padStart(2, 0)}`,
    subjects: [],
    skills: [],
    notice_period: '',
    resume: null,
    certificate: null,
    cover_letter: null,
    pipeline_stage_status: '',
    user_experiences: experienceArray,
    user_educations: educationArray,
    summary:'',
    resume_data: "",

  });
  // const { data: jobData, refetch: jobDataRefetch } = useGetJobListQuery();

  const [file, setFile] = useState(null);

  // const [resume, setResume] = useState(null);
  const [resumeData, setResumeData] = useState({});

  
  useEffect(() => {
    if (countryId !== skipToken) {
      stateDataRefetch();
    }
  }, [countryId,stateDataRefetch]);
  
  useEffect(() => {
    if (stateId !== skipToken) {
      cityDataRefetch();
    }
  }, [stateId,cityDataRefetch]);
  
  useEffect(() => {
    countryDataRefetch();
  }, [countryDataRefetch]);

  useEffect(() => {
    getSkillDataRefetch();
    getSubjectDataRefetch();
    getDesignationDataRefetch();
    getDegreeDataRefetch();
  }, []);

  const handleJobApply = (jobId, jobData) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  // resume shaper
  const handleResumeSelect = async (resumeId) => {
    // const savedResume = savedResumes.find(resume => resume.id === resumeId);
    // console.log("resume_Id", resumeId);
    const selectedResume = userresume.find(resume => resume.id === resumeId);
    // console.log("resumeId", selectedResume );
    setNewFormData({})

    if (!selectedResume) return;

    try {
      const formattedExperiences = selectedResume.employmentHistory?.map(emp => ({
        field1: emp.employer || '',
        field2: emp.jobTitle || '',
        field3: emp.description || '',
        field4: emp.startDate || '',
        field5: emp.endDate || ''
      })) || [];

      const lastEmployer = selectedResume.employmentHistory?.length > 0
        ? selectedResume.employmentHistory[selectedResume.employmentHistory.length - 1]?.employer
        : '';

      console.log("lastEmployer", lastEmployer);


      const formattedEducation = selectedResume.educationHistory?.map(edu => ({
        field1: edu.school || '',         // School name
        field2: edu.degree || '',         // Degree
        field3: edu.description || '',     // Description/Specialization
        field4: edu.startDate || '',      // Start date
        field5: edu.endDate || ''         // End date
      })) || [];


      setExperienceArray(formattedExperiences);
      setEducationArray(formattedEducation);

      let streetData = selectedResume.address;
      if (streetData.length > 100) {
        streetData = streetData.substr(0, 90);
      }

      let calculatedAge = selectedResume.dateOfBirth
      if (calculatedAge) {
        const birthDate = dayjs(calculatedAge);
        const today = dayjs();
        calculatedAge = today.diff(birthDate, 'year');
      }
      

      setNewFormData({
        ...newFormData,
        first_name: selectedResume.firstName || '',
        middle_name: selectedResume.middleName || "",
        last_name: selectedResume.lastName || '',
        email: selectedResume.inputEmail || '',
        mobile: selectedResume.phone || '',
        // date_of_birth: selectedResume.DateOfBirth
        //   ? `${selectedResume.DateOfBirth.get('year')}-${String(selectedResume.DateOfBirth.get('month') + 1).padStart(2, 0)}-${String(selectedResume.DateOfBirth.get('date')).padStart(2, 0)}`
        //   : `${value.get('year')}-${String(value.get('month') + 1).padStart(2, 0)}-${String(
        //     value.get('date')
        //   ).padStart(2, 0)}`,
        date_of_birth: selectedResume.dateOfBirth || '',
        age: calculatedAge, 
        cur_employer: lastEmployer || "",
        gender: '',
        marital_status: '',
        exp_years: '',
        cur_employer: '',
        current_job_title: '',
        professional_degree: selectedResume.educationHistory.degree || '',
        highest_qualification: '',
        curriculum_board: '',
        fun_area: '',
        notice_period: '',
        street: streetData || '',
        // country: data.Address[0].Country || '',
        // state: data.Address[0].State || '',
        // city: data.Address[0].City || '',
        country: '',
        state: '',
        city: '',
        pincode: selectedResume.postalCode || '',
        skills: '',
        summary: selectedResume.professionalSummary || '',
        resume_data: JSON.stringify(selectedResume) || "",

      });
    }
    catch (error) {
      console.error('Error submitting application:', error);
    }
    setIsModalOpen(false);
  };

  const handleFileChanges = (event) => {
    const file = event.target.files[0];
    console.log("file....",file);
    console.log("file....",file.name);
    
    setResume(file);
    // setNewFormData((prevForm) => ({
    //   ...prevForm,
    //   resume: file,
    // }));
  };

  useEffect(() => {
    if (resume) {
      handleUpload();
    }
  }, [resume]);
  
  const handleUpload = () => {
    if (resume) {
      setIsLoading(true)
      setNewFormData({});
      const formData = new FormData();
      formData.append('resume', resume);

      fetch(apiUrl.candidateParseResume, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('Response from server:', data);
          setResumeData(data)

          // for professional degree
          const dynamicProfessionalDegree = data.ProfessionalDegree;
          if (!professionalDegreeOptions.includes(dynamicProfessionalDegree)) {
            setProfessionalDegreeOptions((prevOptions) => [...prevOptions, dynamicProfessionalDegree]);
          }

          // for Highest Qualification Held
          let dynamicQualification = data.Qualification;
          if (dynamicQualification.length > 100) {
            dynamicQualification = dynamicQualification.substr(0, 90);
          }
          if (!qualificationOptions.includes(dynamicQualification)) {
            setQualificationOptions((prevOptions) => [...prevOptions, dynamicQualification]);
          }

          // Update the form data
          setNewFormData((prevFormData) => ({
            ...prevFormData,
            highest_qualification: dynamicQualification,
          }));

          // for Curriculum/Board
          const dynamicEducationBoard = data.Board;
          if (!educationBoardOptions.includes(dynamicEducationBoard)) {
            setEducationBoardOptions((prevOptions) => [...prevOptions, dynamicEducationBoard]);
          }

          // for Functional Area
          const dynamicJobRole = data.FunctionalArea;
          if (!jobRoleOptions.includes(dynamicJobRole)) {
            setJobRoleOptions((prevOptions) => [...prevOptions, dynamicJobRole]);
          }

          // for Notice Period
          const dynamicNoticePeriod = data.NoticePeriod;
          if (!noticePeriodOptions.includes(dynamicNoticePeriod)) {
            setNoticePeriodOptions((prevOptions) => [...prevOptions, dynamicNoticePeriod]);
          }
          // for Skills
          const extractedSkills = data.SegregatedSkill.map(skillObj => skillObj.Skill);
          
          const newArray = data.SegregatedExperience.map((originalObject) => {
            let formattedStartDate = '';
            let formattedEndDate = '';

            if (originalObject.StartDate && originalObject.StartDate.trim() !== '') {
              formattedStartDate = dayjs(originalObject.StartDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            }

            if (originalObject.EndDate && originalObject.EndDate.trim() !== '') {
              formattedEndDate = dayjs(originalObject.EndDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            }

            return {
              field1: originalObject.Employer.EmployerName,
              field2: originalObject.JobProfile.FormattedName,
              field3: originalObject.JobDescription,
              field4: formattedStartDate,
              field5: formattedEndDate
            };
          });
          setExperienceArray(newArray);

          const newArray1 = data?.SegregatedQualification.map((originalObject) => {
            let formattedStartDate = '';
            let formattedEndDate = '';

            if (originalObject.StartDate && originalObject.StartDate.trim() !== '') {
              formattedStartDate = dayjs(originalObject.StartDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            }

            if (originalObject.EndDate && originalObject.EndDate.trim() !== '') {
              formattedEndDate = dayjs(originalObject.EndDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            }
            const dynamicEducationDegree = originalObject.Degree.DegreeName;
            if (!educationalDegreeOptions.includes(dynamicEducationDegree)) {
              setEducationalDegreeOptions((prevOptions) => [...prevOptions, dynamicEducationDegree]);
            }
            return {
              field1: originalObject.Institution.Name,
              field2: originalObject.Degree.DegreeName,
              field3: originalObject.Degree.Specialization[0],
              field4: formattedStartDate,
              field5: formattedEndDate
            };
          });
          setEducationArray(newArray1)

          let dateOfBirthDate = '';
          if (data.DateOfBirth && data.DateOfBirth.trim() !== '') {
            dateOfBirthDate = dayjs(data.DateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD');
          }
          setbirthValue(dateOfBirthDate)

          const age = dateOfBirthDate ? dayjs().diff(dayjs(dateOfBirthDate, 'YYYY-MM-DD'), 'year') : '';

          let streetData = data.Address[0].Street;
          if (streetData.length > 100) {
            streetData = streetData.substr(0, 90);
          }

          setNewFormData({
            ...newFormData,
            first_name: data.Name.FirstName || '',
            last_name: data.Name.LastName || '',
            email: data.Email[0].EmailAddress || '',
            mobile: data.PhoneNumber[0].Number || '',
            // date_of_birth: data.DateOfBirth
            //   ? `${data.DateOfBirth.get('year')}-${String(data.DateOfBirth.get('month') + 1).padStart(2, 0)}-${String(data.DateOfBirth.get('date')).padStart(2, 0)}`
            //   : `${value.get('year')}-${String(value.get('month') + 1).padStart(2, 0)}-${String(
            //     value.get('date')
            //   ).padStart(2, 0)}`,
            date_of_birth: dateOfBirthDate || '',
            age,
            gender: data.Gender || '',
            marital_status: data.MaritalStatus || '',
            exp_years: parseInt(data.WorkedPeriod.TotalExperienceInYear, 10) || '',
            cur_employer: data.CurrentEmployer || '',
            current_job_title: '',
            professional_degree: '',
            highest_qualification: dynamicQualification || '',
            curriculum_board: dynamicEducationBoard || '',
            fun_area: dynamicJobRole || '',
            notice_period: dynamicNoticePeriod || '',
            street: streetData || '',
            // country: data.Address[0].Country || '',
            // state: data.Address[0].State || '',
            // city: data.Address[0].City || '',
            country: '',
            state: '',
            city: '',
            pincode: data.Address[0].ZipCode || '',
            skills: '',
            summary:data.Summary || ''
          });
          // Handle the response from the server
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsLoading(false);
          // Handle errors
        });
    }
  };



  const handleFileChange = (event) => {
    const pdfFile = event.target.files[0];
    // console.log("pdfFile",pdfFile)
    setNewFormData((prevForm) => ({
      ...prevForm,
      professional_certificate: pdfFile,
    }));
    // const reader = new FileReader();

    // reader.onload = () => {
    //   setFile(reader.result);
    // };

    // reader.readAsArrayBuffer(pdfFile);
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    // console.log("file selected", file)

    setNewFormData((prevForm) => ({
      ...prevForm,
      resume: file,
    }));
  }

  const handleCoverLetterFileChange = (e) => {
    const file = e.target.files[0];
    // console.log("file selected",file)

    setNewFormData((prevForm) => ({
      ...prevForm,
      cover_letter: file,
    }));
  }

  const handleCertificateFileChange = (e) => {
    const file = e.target.files[0];

    setNewFormData((prevForm) => ({
      ...prevForm,
      certificate: file,
    }));
  }

  
  // const [job,setJob] = useState(0);
  // const handleChangeJob = (e) => setJob(e.target.value);


  // useEffect(()=>{
  //   console?.log("hii")
  //   stateDataRefetch()
  // },[newFormData?.country])

  const handleChangenewFormData = (name, value) => {
    if (name === 'country') {
      const selectedCountry = countryData?.countries?.find(country => country.id === value);
      setCountryId(selectedCountry ? selectedCountry.id : skipToken);
      setNewFormData((prev) => ({
        ...prev,
        country: selectedCountry ? selectedCountry.id : '',
        state: '',
        city: ''
      }));
    } else if (name === 'state') {
      const selectedState = stateData?.states?.find(state => state.id === value);
      setStateId(selectedState ? selectedState.id : skipToken);
      setNewFormData((prev) => ({
        ...prev,
        state: selectedState ? selectedState.id : '',
        city: ''
      }));
    } else if (name === 'city') {
      const selectedCity = cityData?.cities?.find(city => city.id === value);
      setNewFormData((prev) => ({
        ...prev,
        city: selectedCity ? selectedCity.id : '',
      }));
    }else if (name === 'skills') {
      // Ensure value is always an array of IDs
      const skillIds = Array.isArray(value) ? value : [value];
      setNewFormData((prev) => ({
        ...prev,
        skills: skillIds
      }));
    } else if (name === 'subjects') {
      // Handle subjects similar to skills - just store the IDs
      setNewFormData((prev) => ({
        ...prev,
        subjects: Array.isArray(value) ? value : [value]
      }));
     } else {
      setNewFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // const convertDataToFormData = async(data) => {
  //   const bDate = new Date(newFormData.date_of_birth).toISOString().slice(0, 10);
  //   const truncatedQualification = newFormData.highest_qualification.substr(0, 90);
  //   const formData = new FormData();
  //   // Append the JSON data as a field
  //   formData.append('job', newFormData.job);
  //   formData.append('first_name', newFormData.first_name);
  //   formData.append('middle_name', newFormData.middle_name);
  //   formData.append('last_name', newFormData.last_name);
  //   formData.append('mobile', newFormData.mobile);
  //   formData.append('alternate_mobile', newFormData.alternate_mobile);
  //   formData.append('email', newFormData.email);
  //   formData.append('alternate_email', newFormData.alternate_email);
  //   formData.append('gender', newFormData.gender);
  //   formData.append('marital_status', newFormData.marital_status);
  //   formData.append('bachlor_degree', newFormData.bachlor_degree);
  //   formData.append('professional_degree', newFormData.professional_degree);
  //   formData.append('date_of_birth', bDate);
  //   formData.append('age', newFormData.age);
  //   formData.append('pincode', newFormData.pincode);
  //   formData.append('state', newFormData.state);
  //   formData.append('country', newFormData.country);
  //   formData.append('city', newFormData.city);
  //   formData.append('street', newFormData.street);
  //   formData.append('exp_years', newFormData.exp_years);
  //   formData.append('highest_qualification', truncatedQualification);
  //   formData.append('current_job_title', newFormData.current_job_title);
  //   formData.append('cur_employer', newFormData.cur_employer);
  //   formData.append('curriculum_board', newFormData.curriculum_board);
  //   formData.append('fun_area', newFormData.fun_area);
  //   formData.append('professional_start_date', newFormData.professional_start_date);
  //   formData.append('professional_end_date', newFormData.professional_end_date);
  //   // formData.append('subjects', JSON.stringify(newFormData.subjects));
  //   formData.append('notice_period', newFormData.notice_period);
  //   formData.append('skills', newFormData.skills);
  //   formData.append('pipeline_stage_status', newFormData.pipeline_stage_status);
  //   formData.append('summary', newFormData.summary);
  //   // Append files
  //   // formData.append('professional_certificate', newFormData.professional_certificate);
  //   // formData.append('resume', newFormData.resume);
  //   // formData.append('cover_letter', newFormData?.cover_letter);
  //   // formData.append('certificate', newFormData?.certificate);
  //   if (newFormData?.cover_letter instanceof File) {
  //     formData.append('cover_letter', newFormData.cover_letter);
  //   }
  //   if (newFormData?.certificate instanceof File) {
  //     formData.append('certificate', newFormData.certificate);
  //   }
  //   if (newFormData?.professional_certificate instanceof File) {
  //     formData.append('certificate', newFormData.professional_certificate);
  //   }
  //   formData.append('user_experiences', JSON.stringify(newFormData.user_experiences));
  //   formData.append('user_educations', JSON.stringify(newFormData.user_educations));
  //   newFormData.subjects.forEach((subject, index) => {
  //     formData.append(`subjects[${index}]`, subject);
  //   });
  //     await AddCandidate(formData);
  // };


  // const handleSubmit = async () => {
  //   // console.log("submitted fields", newFormData);
  //   if (editCandidateId) {
  //     // await updateCandidate(newFormData, editCandidateId);
  //     const headers = {
  //       'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
  //     }
  //     axios.put(`http://127.0.0.1:8000/candidate/create_candidate/${editCandidateId}/`, newFormData, { headers })
  //       .then(response => {
  //         // console.log('PUT request successful:', response);
  //         showToast('success', 'update Job succesfully');
  //         navigate('/dashboard/candidates');
  //       })
  //       .catch(error => {
  //         console.error('PUT request failed:', error);
  //       });
  //   }
  //   else {
  //     convertDataToFormData(newFormData);
  //   }
  // };

  useEffect(()=>{
    setNewFormData(webformDatafilledRedux)
    // console.log("candidate details",webformDatafilledRedux)
    // console.log("Highest Qualification:", webformDatafilledRedux.highest_qualification);
  },[])


  useEffect(() => {
    dispatch(jobAction(newFormData));
  }, [newFormData])
  
  // useEffect(() => {
  //   // console.log(AddCandidateInfo.data);
  //   if (AddCandidateInfo.isError) {
  //     console.log(AddCandidateInfo.error.error);
  //     showToast('error', 'Error has occurred');
  //   }
  //   if (AddCandidateInfo.isSuccess) {
  //     // showToast('success', 'Successfully added candidate');
  //     navigate('/dashboard/candidates/');
  //   }
  // }, [AddCandidateInfo, navigate]);

  // if (isLoading) {
  //   return (
  //     <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  //       <CircularProgress />
  //     </Container>
  //   );
  // }
  const extractFileName = (url) => {
    if (typeof url === 'string') {
      const parts = url.split('/');
      return parts[parts.length - 1];
    }
    // Handle the case where url is not a string (e.g., null, undefined, or another type)
    // You can return a default value or handle it according to your requirements.
    return null; // or throw an error, return an empty string, etc.
  };

  useEffect(() => {
    setIsResumeLoading(true);
    // Simulate fetching resumes
    // Replace this with your actual fetching logic
    setTimeout(() => {
      setIsResumeLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);

  // function handleSubject(e) {
  //   if (e.target.value === "Other") {
  //     setShowTextField(true);
  //   }
  //   let selectedSubjects = [...newFormData.subjects];
  //   if (e.target.checked) {
  //     selectedSubjects.push(e.target.value);
  //   } else {
  //     selectedSubjects = selectedSubjects.filter((item) => item !== e.target.value);
  //   }
  //   // console.log(selectedSubjects);
  //   handleChangenewFormData('subjects', selectedSubjects);
  // }

  // function handleCertificates(e) {
  //   const selectedCerti = [...newFormData.professional_certificate];
  //   const { name, value } = e.target;
  //   setNewFormData({
  //     ...newFormData,
  //     [name]: value,
  //   });
  //   handleChangenewFormData('professional_certificate');
  // }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <Card sx={{ marginTop: '1%', padding: '10px' }}> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography 
            variant="h5" 
            sx={{ 
              marginBottom: '2%', 
              marginLeft: '12%', 
              marginTop: '3%', 
              backgroundColor: 'transparent !important' 
            }}
          >
            Attachment
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '60%' }}>
          <Grid item>
            <InputLabel>Resume</InputLabel>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 0 }} md={4}>
            {isResumeLoading ? ( // Check if resumes are loading
              <CircularProgress /> // Show loader while loading
            ) : userresume ? (
              <Button variant="contained" color="primary" onClick={handleJobApply} disabled={disabled}>select resume</Button>
            ) : (
              <Input
                type="file"
                sx={{ width: '90%' }}
                disabled={disabled}
                required
                accept=".pdf,.doc,.docx"
                aria-describedby="my-helper-text"
                id="upload-resume"
                label="Upload Resume"
                variant="standard"
                onChange={handleFileChanges}
              />
            )}
          </Grid>
          {/* <Grid item>
            <Button variant="contained" size="small" disabled={!resume} onClick={handleUpload}>
              Upload Resume
            </Button>
          </Grid> */}
          {/* {newFormData.resume && (
            <>
              <Grid item>
                <a 
                  href={typeof newFormData.resume === 'string' ? encodeURI(newFormData.resume) : URL.createObjectURL(newFormData.resume)}  
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="contained" size="small">
                    View Current Resume
                  </Button>
                </a>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ marginTop: 1 }} md={4}>
                <TextField
                  sx={{ width: '90%' }}
                  variant="standard"
                  value={typeof newFormData.resume === 'object' && newFormData.resume.name 
                    ? extractFileName(newFormData.resume.name) 
                    : extractFileName(newFormData.resume)}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </>
          )} */}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography 
            variant="h5" 
            sx={{ 
              width: '300px',
              marginBottom: '2%', 
              marginLeft: '12%', 
              marginTop: '2%', 
              backgroundColor: 'transparent !important' 
            }}
          >
            Personal Details
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '60%' }}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              required
              id="standard-required"
              label="First Name"
              variant="standard"
              value={newFormData?.first_name || ''}
              name="first_name"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              id="standard-required"
              label="Middle Name"
              variant="standard"
              value={newFormData?.middle_name || ''}
              name="middle_name"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              required
              id="standard-required"
              label="Last Name"
              variant="standard"
              value={newFormData?.last_name || ''}
              name="last_name"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              required
              id="standard-required"
              label="Email"
              variant="standard"
              value={newFormData?.email || ''}
              name="email"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
              onBlur={() => handleFieldTouch('email')}
              error={touchedFields.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newFormData?.email)}
              helperText={touchedFields.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newFormData?.email) ? 'Invalid email address' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              id="standard-required"
              label="Alternative Email"
              variant="standard"
              value={newFormData?.alternate_email || ''}
              name="alternate_email"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
              onBlur={() => handleFieldTouch('alternate_email')}
              error={touchedFields.alternate_email && newFormData?.alternate_email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newFormData?.alternate_email)}
              helperText={touchedFields.alternate_email && newFormData?.alternate_email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newFormData?.alternate_email) ? 'Invalid email address' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            {/* <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              required
              type="tel"
              id="standard-required"
              label="Mobile Number"
              variant="standard"
              value={newFormData?.mobile || ''}
              name="mobile"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
              onBlur={() => handleFieldTouch('mobile')}
              error={touchedFields.mobile && !/^\d+$/.test(newFormData?.mobile)}
              helperText={touchedFields.mobile && !/^\d+$/.test(newFormData?.mobile) ? 'Invalid mobile number' : ''}
            /> */}
            <FormControl variant="standard" sx={{ width: '90%' }}>
                <InputLabel
                  shrink
                  sx={{
                    transform: 'translate(0, -1.5px) scale(0.75)',
                    transformOrigin: 'top left'
                  }}
                >
                  Mobile Number
                </InputLabel>
                <PhoneInput
                  country={'in'}
                  value={newFormData?.mobile || ''}
                  onChange={(value) => {
                    // Only update if value is valid phone number
                    if (value.match(/^\+?[\d\s-]+$/)) {
                      handleChangenewFormData('mobile', value);
                    }
                  }}
                  disabled={disabled}
                  inputStyle={{
                    width: '100%',
                    height: '32px',
                    fontSize: '16px',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                    borderRadius: '0',
                    backgroundColor: 'transparent',
                  }}
                  buttonStyle={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    padding: '0',
                    borderRadius: '0'
                  }}
                  dropdownStyle={{
                    width: '300px'
                  }}
                  containerStyle={{
                    marginTop: '16px'
                  }}
                  // enableSearch={true}
                  searchPlaceholder="Search country..."
                  placeholder=''
                  specialLabel=""
                  inputProps={{
                    required: true,
                    onBlur: () => handleFieldTouch('mobile')
                  }}
                />
                {touchedFields.mobile && !/^\+?[\d\s-]{7,20}$/.test(newFormData?.mobile) && (
                  <FormHelperText error>
                    Invalid mobile number
                  </FormHelperText>
                )}
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            {/* <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              type="tel"
              id="standard-required"
              label="Alternative Mobile Number"
              variant="standard"
              value={newFormData?.alternate_mobile || ''}
              name="alternate_mobile"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
              onBlur={() => handleFieldTouch('alternate_mobile')}
              error={touchedFields.alternate_mobile && newFormData?.alternate_mobile && !/^\d+$/.test(newFormData?.alternate_mobile)}
              helperText={touchedFields.alternate_mobile && newFormData?.alternate_mobile && !/^\d+$/.test(newFormData?.alternate_mobile) ? 'Invalid mobile number' : ''}
            /> */}
            <FormControl variant="standard" sx={{ width: '90%' }}>
              <InputLabel
                shrink
                sx={{
                  transform: 'translate(0, -1.5px) scale(0.75)',
                  transformOrigin: 'top left'
                }}
              >
                Alternative Mobile Number
              </InputLabel>
              <PhoneInput
                country={'in'}
                value={newFormData?.alternate_mobile || ''}
                onChange={(value) => {
                  // Only update if value is valid phone number
                  if (value.match(/^\+?[\d\s-]+$/)) {
                    handleChangenewFormData('alternate_mobile', value);
                  }
                }}
                disabled={disabled}
                inputStyle={{
                  width: '100%',
                  height: '32px',
                  fontSize: '16px',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                  borderRadius: '0',
                  backgroundColor: 'transparent',
                }}
                buttonStyle={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  padding: '0',
                  borderRadius: '0'
                }}
                dropdownStyle={{
                  width: '300px'
                }}
                containerStyle={{
                  marginTop: '16px'
                }}
                searchPlaceholder="Search country..."
                placeholder=''
                specialLabel=""
                inputProps={{
                  onBlur: () => handleFieldTouch('alternate_mobile')
                }}
              />
              {touchedFields.alternate_mobile && newFormData?.alternate_mobile && !/^\+?[\d\s-]{7,20}$/.test(newFormData?.alternate_mobile) && (
                <FormHelperText error>
                  Invalid mobile number
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                sx={{ width: '90%' }}
                disabled={disabled}
                disableFuture
                label="Date of Birth"
                inputFormat="YYYY-MM-DD"
                // value={birthvalue}
                value={newFormData.date_of_birth ? dayjs(newFormData.date_of_birth) : null}
                onChange={(e) => {
                  const date = dayjs(e);
                  const today = dayjs();
                  const age = today.diff(date, 'year');
                  handleChangeBirth(date);
                  handleChangenewFormData('age', age);
                  handleChangenewFormData('date_of_birth', date.format('YYYY-MM-DD'));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              type="number"
              id="standard-required"
              label="Age"
              variant="standard"
              value={newFormData?.age || ''}
              name="age"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
              <Select
                sx={{ width: '90%' }}
                disabled={disabled}
                margin="dense"
                variant="standard"
                fullWidth
                value={newFormData?.gender || ''}
                name="gender"
                label="Gender"
                onChange={(e) => handleChangenewFormData(e?.target?.name, e?.target?.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">Marital Status</InputLabel>
              <Select
                sx={{ width: '90%' }}
                disabled={disabled}
                margin="dense"
                variant="standard"
                fullWidth
                value={newFormData?.marital_status || ''}
                name="marital_status"
                label="Marital Status"
                onChange={(e) => handleChangenewFormData(e?.target?.name, e?.target?.value)}
              >
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Widow">Widow</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography 
            variant="h5" 
            sx={{ 
              marginBottom: '2%', 
              marginLeft: '12%', 
              marginTop: '2%', 
              backgroundColor: 'transparent !important' 
            }}
          >
            Professional Details
          </Typography>
        </Grid>  
        <Grid container spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '60%' }}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              required
              id="standard-required"
              label="Years of Experience"
              variant="standard"
              value={newFormData?.exp_years || ''}
              name="exp_years"
              onChange={(e) => handleChangenewFormData(e.target.name, +e.target.value)}
            />
          </Grid>  
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">Highest Qualification held</InputLabel>
              <Select
                sx={{ width: '90%' }}
                disabled={disabled}
                margin="dense"
                variant="standard"
                fullWidth
                value={newFormData?.highest_qualification || ''}
                name="highest_qualification"
                label="Select"
                inputProps={{ maxLength: 100 }} 
                onChange={(e) => handleChangenewFormData('highest_qualification', e.target.value)}
                MenuProps={{
                  PaperProps: {
                      style: {
                          maxHeight: 48 * 4 + 8, 
                          width: 250,
                      },
                  },
                }}
              >
                {qualificationOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>  
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              required
              id="standard-required"
              label="Current Employer"
              variant="standard"
              value={newFormData?.cur_employer || ''}
              name="cur_employer"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={1} container alignItems="center">
            <Checkbox
              disabled={disabled}
              checked={isCurrentJob}
              onChange={handleCurrentJobChange}
              name="currentJob"
              color="primary"
            />
            <Typography component="span" sx={{ backgroundColor: 'transparent !important' }}>I am currently working here</Typography>
          </Grid> 
          <Grid item xs={12} sm={2} sx={{ marginTop: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                sx={{ width: '90%' }}
                disabled={disabled}
                disableFuture
                label="From"
                inputFormat="YYYY-MM-DD"
                value={professionalStartDate}
                onChange={(e) => {
                  const date = dayjs(e);
                  const year = date.year();
                  const todaysDate = dayjs(new Date().toISOString());
                  const currentYear = todaysDate.year();
                  handleChangeProfessionalStartDate(e)
                  handleChangenewFormData(
                    'professional_start_date',
                    `${date.get('year')}-${String(date.get('month') + 1).padStart(2, 0)}-${String(
                      date.get('date')
                    ).padStart(2, 0)}`
                  );
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ marginTop: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                sx={{ width: '90%' }}
                disabled={disabled}
                disableFuture
                label="To"
                inputFormat="YYYY-MM-DD"
                value={professionalEndDate}
                onChange={(e) => {
                  const date = dayjs(e);
                  handleChangeProfessionalEndDate(e);
                  handleChangenewFormData(
                    'professional_end_date',
                    `${date.get('year')}-${String(date.get('month') + 1).padStart(2, 0)}-${String(date.get('date')).padStart(2, 0)}`
                  );
                }}
                renderInput={(params) => <TextField {...params} />}
                // disabled={isCurrentJob} 
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            {/* <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              required
              id="standard-required"
              label="Current Job Title"
              variant="standard"
              value={newFormData?.current_job_title}
              name="current_job_title"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
            /> */}
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <Autocomplete
                id="current-job-title-autocomplete"
                size="small"
                options={designationData?.data || []}
                getOptionLabel={(option) => option.name || ''}
                value={designationData?.data?.find(item => item.id === newFormData?.current_job_title) || null}
                onChange={(event, newValue) => {
                  handleChangenewFormData('current_job_title', newValue?.id || '');
                }}
                disabled={disabled}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Current Job Title"
                    placeholder="Select Current Job Title"
                    sx={{ width: '90%' }} 
                  />
                )}
                ListboxProps={{
                  style: {
                    maxHeight: '200px',
                    overflow: 'auto',
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            {/* <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">Professional Degree</InputLabel>
              <Select
                sx={{ width: '90%' }}
                disabled={disabled}
                margin="dense"
                variant="standard"
                fullWidth
                value={newFormData?.professional_degree || ''}
                name="professional_degree"
                label="Select"
                onChange={(e) => handleChangenewFormData(e?.target?.name, e?.target?.value)}
              >
                {professionalDegreeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <Autocomplete
                id="professional-degree-autocomplete"
                size="small"
                options={degreeData?.data || []}
                getOptionLabel={(option) => option.name || ''}
                value={degreeData?.data?.find(item => item.id === newFormData?.professional_degree) || null}
                onChange={(event, newValue) => {
                  handleChangenewFormData('professional_degree', newValue?.id || '');
                }}
                disabled={disabled}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Professional Degree"
                    placeholder="Select Professional Degree"
                    sx={{ width: '90%' }} 
                  />
                )}
                ListboxProps={{
                  style: {
                    maxHeight: '200px',
                    overflow: 'auto',
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">Curriculum/Board</InputLabel>
              <Select
                sx={{ width: '90%' }}
                disabled={disabled}
                margin="dense"
                variant="standard"
                fullWidth
                value={newFormData?.curriculum_board || ''}
                name="curriculum_board"
                label="Select"
                onChange={(e) => handleChangenewFormData(e?.target?.name, e?.target?.value)}
                MenuProps={{
                  PaperProps: {
                      style: {
                          maxHeight: 48 * 4 + 8, 
                          width: 250,
                      },
                  },
                }}
              >
                {educationBoardOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">Functional Area</InputLabel>
              <Select
                sx={{ width: '90%' }}
                disabled={disabled}
                margin="dense"
                variant="standard"
                fullWidth
                value={newFormData?.fun_area || ''}
                name="fun_area"
                label="Select"
                onChange={(e) => handleChangenewFormData(e?.target?.name, e?.target?.value)}
                MenuProps={{
                  PaperProps: {
                      style: {
                          maxHeight: 48 * 4 + 8, 
                          width: 250,
                      },
                  },
                }}
              >
                {jobRoleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">Notice Period</InputLabel>
              <Select
                sx={{ width: '90%' }}
                disabled={disabled}
                margin="dense"
                variant="standard"
                fullWidth
                value={newFormData?.notice_period || ''}
                name="notice_period"
                label="Select"
                onChange={(e) => handleChangenewFormData(e?.target?.name, e?.target?.value)}
                MenuProps={{
                  PaperProps: {
                      style: {
                          maxHeight: 48 * 4 + 8, 
                          width: 250,
                      },
                  },
                }}
              >
                {noticePeriodOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <Input
                type="file"
                sx={{
                  width: '90%',
                  // marginRight: '0',
                }}
                disabled={disabled}
                aria-describedby="my-helper-text"
                id="standard-required"
                label="Upload Resume"
                variant="standard"
                name="professional_certificate"
                onChange={handleFileChange}
              />
              {newFormData?.professional_certificate && <p>Selected File: {newFormData?.professional_certificate.name}</p>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            {/* <FormControl variant="standard" sx={{ width: '90%' }}>
              <Typography variant="body1"
              sx={{ 
                fontWeight: 'normal',
                backgroundColor: 'transparent !important'
              }}
              >
                Subjects
              </Typography>
              <MultiSelect
                disabled={disabled}
                options={options}
                value={selected}
                onChange={handleMultiSelectChange}
                labelledBy="Select"
              />
            </FormControl> */}
            <FormControl variant="standard" sx={{ width: '90%' }}>
              <Typography variant="body1"
                sx={{
                  fontWeight: 'normal',
                  backgroundColor: 'transparent !important'
                }}
              >
                Subjects
              </Typography>
              <MultiSelect
                value={newFormData?.subjects || []}
                onChange={(selectedIds) => handleChangenewFormData('subjects', selectedIds)}
                labelledBy="Select"
                options={subjectData?.data?.map(subject => ({
                  label: subject.name,
                  value: subject.id
                })) || []}
                disabled={disabled}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography 
            variant="h5" 
            sx={{ 
              marginBottom: '2%', 
              marginLeft: '12%', 
              marginTop: '2%', 
              backgroundColor: 'transparent !important' 
            }}
          >
            Address
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '60%' }}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              required
              id="standard-required"
              label="Street"
              variant="standard"
              value={newFormData?.street || ''}
              name="street"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
              inputProps={{ maxLength: 100 }}
              error={touchedFields.street && newFormData?.street.length > 100} 
              helperText={touchedFields.street && newFormData?.street.length > 100 ? 'Street cannot exceed 100 characters' : ''} 
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '90%' }}>
              <Typography variant="body1"
              sx={{ 
                fontWeight: 'normal',
                backgroundColor: 'transparent !important'
              }}
              >
                Country
              </Typography>
              <MultiSelect
                disabled={disabled}
                options={countryData?.countries?.map(country => ({ label: country.name, value: country.id })) || []}
                value={newFormData?.country ? [{ label: countryData?.countries?.find(country => country.id === newFormData.country)?.name, value: newFormData.country }] : []}
                onChange={(selected) => handleChangenewFormData('country', selected[0]?.value || '')}
                labelledBy="Select Country"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '90%' }}>
              <Typography variant="body1"
              sx={{ 
                fontWeight: 'normal',
                backgroundColor: 'transparent !important'
              }}
              >
                State
              </Typography>
              <MultiSelect
                disabled={disabled}
                options={stateData?.states?.map(state => ({ label: state.name, value: state.id })) || []}
                value={newFormData?.state ? [{ label: stateData?.states?.find(state => state.id === newFormData.state)?.name, value: newFormData.state }] : []}
                onChange={(selected) => handleChangenewFormData('state', selected[0]?.value || '')}
                labelledBy="Select State"
                overrideStrings={{
                  noOptions: "No Select a country", // Custom message
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '90%' }}>
              <Typography variant="body1"
                sx={{ 
                  fontWeight: 'normal',
                  backgroundColor: 'transparent !important'
                }}
              >
                City
              </Typography>
              <MultiSelect
                disabled={disabled}
                options={cityData?.cities?.map(city => ({ label: city.name, value: city.id })) || []}
                value={newFormData?.city ? [{ label: cityData?.cities?.find(city => city.id === newFormData.city)?.name, value: newFormData.city }] : []}
                onChange={(selected) => handleChangenewFormData('city', selected[0]?.value || '')}
                labelledBy="Select City"
                overrideStrings={{
                  noOptions: "No Select a state", // Custom message
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              required
              type="number"
              id="standard-required"
              label="Pin code"
              variant="standard"
              value={newFormData?.pincode}
              name="pincode"
              onChange={(e) => handleChangenewFormData(e.target.name, e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
            marginBottom: '2%',
            marginLeft: '12%',
            marginTop: '2%',
            backgroundColor: 'transparent !important'
            }}
          >
            Skills
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '60%' }}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            {/* <AntSelect
              mode="tags"
              style={{ width: '90%' }}
              disabled={disabled}
              value={newFormData?.skills || []}
              onChange={(value) => handleChangenewFormData('skills', value)}
              tokenSeparators={[',']}
            /> */}
            <AntSelect
              mode="tags"
              style={{ width: '90%' }}
              value={newFormData?.skills || []}
              onChange={(selectedIds) => handleChangenewFormData('skills', selectedIds)}
              tokenSeparators={[',']}
              showSearch
              filterOption={(input, option) =>
                option?.label.toLowerCase().includes(input.toLowerCase())
              }
              options={skillData?.data?.map(skill => ({
                label: skill.name,
                value: skill.id
              })) || []}
              disabled={disabled}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
            marginBottom: '2%',
            marginLeft: '12%',
            marginTop: '2%',
            backgroundColor: 'transparent !important'
            }}
          >
            Experience
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '60%' }}>
          {experienceArray.map((formData, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
              <TextField
                sx={{ width: '90%' }}
                disabled={disabled}
                required
                id="standard-required"
                label="Name of Company"
                value={formData?.field1}
                variant="standard"
                name="company_name"
                onChange={(e) => handleFormChange(index, 'field1', e.target.value)}
              />
            </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
              sx={{ width: '90%' }}
              disabled={disabled}
              id="standard-required"
              label="Designation"
              variant="standard"
              value={formData?.field2}
              name="designations"
              onChange={(e) => handleFormChange(index, 'field2', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 1 }}>
            <FormControl fullWidth variant="standard">
            <Box
                sx={{
                  width: '90%',
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
              >
                <TextareaAutosize
                  disabled={disabled}
                  id="my-textarea"
                  aria-label="textarea"
                  placeholder="Job Responsibilities"
                  name="job_responsibility"
                  value={formData?.field3}
                  onChange={(e) => handleFormChange(index, 'field3', e.target.value)}
                  minRows={5}
                  style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                />
              </Box>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ marginTop: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
              sx={{ width: '90%' }}
              disabled={disabled}
              disableFuture
              label="From"
              inputFormat="YYYY-MM-DD"
              value={formData?.field4}
              onChange={(e) => handleChangeExperienceStartDate(index, 'field4', e)}
              renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ marginTop: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
              sx={{ width: '90%' }}
              disabled={disabled}
              disableFuture
              label="To"
              inputFormat="YYYY-MM-DD"
              value={formData?.field5}
              onChange={(e) => handleChangeExperienceEndDate(index, 'field5', e)}
              renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        ))}
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddForm} disabled={disabled}>Add Experience</Button>
          </Grid>
          {experienceArray.length > 1 && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleRemoveForm} disabled={disabled}>Remove Experience</Button>
          </Grid>
          )}
        </Grid>
        </Grid>

      <Grid item xs={12}>
        <Typography
        variant="h5"
        sx={{
        marginBottom: '2%',
        marginLeft: '12%',
        marginTop: '2%',
        backgroundColor: 'transparent !important'
        }}
        >
          Education
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '60%' }}>
        {educationArray.map((formData, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
            sx={{ width: '90%' }}
            disabled={disabled}
            required
            id="standard-required"
            label="School Name"
            variant="standard"
            value={formData?.field1 || ''}
            name="school_name"
            onChange={(e) => handleEducationFormChange(index, 'field1', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">Degree</InputLabel>
              <Select
                sx={{ width: '90%' }}
                disabled={disabled}
                margin="dense"
                variant="standard"
                fullWidth
                value={formData?.field2 || ''}
                name="Degree"
                label="Select"
                onChange={(e) => handleEducationFormChange(index, 'field2', e.target.value)}
                MenuProps={{
                  PaperProps: {
                      style: {
                          maxHeight: 48 * 4 + 8, 
                          width: 250,
                      },
                  },
                }}
              >
                {educationalDegreeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                {option}
                </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
            <TextField
            sx={{ width: '90%' }}
            disabled={disabled}
            margin="dense"
            variant="standard"
            label="Specialization"
            fullWidth
            value={formData?.field3 || ''}
            name="Specialization"
            onChange={(e) => handleEducationFormChange(index, 'field3', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ marginTop: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              sx={{ width: '90%' }}
              disabled={disabled}
              disableFuture
              label="Start Date"
              inputFormat="YYYY-MM-DD"
              value={formData?.field4}
              onChange={(e) => handleChangeEducationStartDate(index, 'field4', e)}
              renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ marginTop: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              sx={{ width: '90%' }}
              disabled={disabled}
              disableFuture
              label="End Date"
              inputFormat="YYYY-MM-DD"
              value={formData?.field5}
              onChange={(e) => handleChangeEducationEndDate(index, 'field5', e)}
              renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
          </Grid>
        </Grid>
        ))}
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleEducationAddForm} disabled={disabled}>Add Education</Button>
          </Grid>
          {educationArray.length > 1 && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleEducationRemoveForm} disabled={disabled}>Remove Education</Button>
          </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
          marginBottom: '2%',
          marginLeft: '12%',
          marginTop: '2%',
          backgroundColor: 'transparent !important'
          }}
        >
        Attachment
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '60%' }}>
        <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
        <InputLabel sx={{ textAlign: 'left' }}>Cover Letter</InputLabel>
        <Input
          type="file"
          sx={{ width: '90%' }}
          disabled={disabled}
          required
          aria-describedby="my-helper-text"
          id="standard-required"
          label="Upload Resume"
          variant="standard"
          name="cover_letter"
          onChange={handleCoverLetterFileChange}
        />
        {newFormData?.cover_letter && <p>Selected File: {newFormData?.cover_letter.name}</p>}
        {/* <Typography>{extractFileName(newFormData?.cover_letter)}</Typography> */}
      </Grid>
      <Grid item xs={12} sm={6} sx={{ marginTop: 1 }}>
        <InputLabel sx={{ textAlign: 'left' }}>Certificate</InputLabel>
        <Input
          type="file"
          sx={{ width: '90%' }}
          disabled={disabled}
          required
          aria-describedby="my-helper-text"
          id="standard-required"
          label="Upload Resume"
          variant="standard"
          name="certificate"
          onChange={handleCertificateFileChange}
        />
        {newFormData?.certificate && <p>Selected File: {newFormData?.certificate.name}</p>}
        {/* <Typography>{extractFileName(newFormData?.certificate)}</Typography> */}
      </Grid>
    </Grid>
      </Grid>
    {/* </Card> */}
      {isModalOpen && (
        <ResumeSelectorModal
          resumes={userresume}
          onSelect={handleResumeSelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}

    </div>
  );
}

export default FillDetails;
