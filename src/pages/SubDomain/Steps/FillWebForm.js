import {
  Stack,
  Input,
  InputLabel,
  Button,
  Container,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { jobAction } from "../../../redux/job/JobReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetWebformDetailsQuery } from "../../../redux/services/settings/WebformService";

function FillWebForm({ disabled = false }) {
  const { webform } = useParams();
  const { data: webformData, refetch } = useGetWebformDetailsQuery(+webform)
  const dispatch = useDispatch()
  const [webformDatafilled, setWebformDatafilled] = useState({});
  const webformDatafilledRedux = useSelector((state) => state?.job?.job)
  const [resume, setResume] = useState(null);
  const [formValues, setFormValues] = useState(webformDatafilledRedux.FormData || {});

  const handleFileChanges = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };

  // const handleChange = async (sectionName, fieldName, value) => {
  //   await setWebformDatafilled({
  //     ...webformDatafilled,
  //     [fieldName]: value
  //   })
  //   console.log("webform",webformDatafilled)
  // }

  const handleFieldChange = async(sectionName, fieldName, value) => {
    await setWebformDatafilled({
      ...webformDatafilled,
      [fieldName]: value,
      webforms:webformData
    })
    setFormValues(prevValues => ({
      ...prevValues,
      [sectionName]: {
        ...(prevValues[sectionName] || {}),
        [fieldName]: value,
      },
    }));
  };

  useEffect(()=>{
    setWebformDatafilled(webformDatafilledRedux)
  },[])

  useEffect(() => {
    const modifiedFormData = { ...webformDatafilled,FormData:formValues };
    // console.log("webform1",modifiedFormData)
    dispatch(jobAction(modifiedFormData));
  }, [formValues])





  return (
    <Container className='ApplicationSteps'
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        textAlign: "left",
        gap: "2rem"
      }}
    >
      <Typography variant='h4'>{webformData?.data?.name}</Typography>
      <Container>
      {webformData?.data?.form?.map((section, i) => (
        <Container key={i}>
          <Divider flexItem textAlign='left' style={{ marginBottom: "3em" }}>{section.name}</Divider>
          <Container>
            {section.fields?.map((field, j) => (
                field.name === "Date of Birth(yyyy-mm-dd)" && (
                  <InputLabel key={j} id="demo-simple-select-standard-label">Date of Birth</InputLabel>
                ),
              <TextField
                key={j}
                disabled={disabled}
                name={field?.name}
                // label={field.name}
                placeholder={field.name}
                style={{ margin: "1rem" }}
                type={field?.type === "Date" ? "date" : "text"}
                onChange={(e) => handleFieldChange(section.name, field.name, e.target.value)}
                // value={formValues[section.name]?.[field.name] || ''}
                value={webformDatafilledRedux?.[field?.name]}
              />
            ))}
          </Container>
        </Container>
      ))}
      </Container>
    </Container>
  )
}

export default FillWebForm