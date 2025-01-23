import React, { useEffect } from "react";
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  ListItemIcon,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  Box,
  Checkbox,
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAssesmentCareerQuery } from "../../../redux/services/main/AssesmentService";
import { assesmentforsubmit } from "../../../redux/a/assesment";
import { useDispatch, useSelector } from "react-redux";
import { useCreateAssesmentMutation } from "../../../redux/services/jobs/JobServices"
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { showToast } from "../../../utils/toast";
import { useAddCandidateMutation} from '../../../redux/services/candidate/CandidateServices';


function CompleteAssesment({ disabled = false, assesmentId }) {
  const navigate = useNavigate()
  const [createAssesment, createAssesmentInfo] = useCreateAssesmentMutation()
  const [AddCandidate, AddCandidateInfo] = useAddCandidateMutation()

  // const { assesment } = useParams();
  const { webform } = useParams();
  const assesment = localStorage?.getItem("assesment");
  const temp = JSON.parse(assesment);
  // console.log(temp);
  const dispatch = useDispatch();
  const { data, refetch } = useGetAssesmentCareerQuery(assesmentId ? assesmentId : temp);
  const assesmentData = useSelector((state) => state?.assesment?.assesment);
  // console.log("assesment from redux",assesmentData)
  let copyData = JSON.parse(JSON.stringify(data || [{}]));



  const handleChange = async (e, index) => {
    // console.log("cpydata 1", e.target.checked)
    if (copyData.form[index].type === "C") {
      // console.log("cpydata 2", copyData)
      let ans = copyData.form[index].candidateAnswer
      if (!Array.isArray(ans)) {
        // console.log("cpydata if", copyData)
        ans = [copyData.form[index].candidateAnswer]
      }
      if (!ans.includes(e.target.value)) {
        ans.push(e.target.value)
      }
      if (!e.target.checked) {
        ans.splice(index, 1)
      }
      copyData.form[index].candidateAnswer = ans
    }
    else {
      copyData.form[index].candidateAnswer = e.target.value
    }
    // data[index].candidateAnswer = e?.target?.value;
    // console.log("cpydata 3", copyData)
  };

  const handleSubmit = () => {
    dispatch(assesmentforsubmit(copyData));
    showToast('success', 'Assessment Submitted');
    setOpen(true);
  };

  useEffect(() => {
    refetch();
  }, [webform]);


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



  return (
    <div className="ApplicationSteps">
      <Container>
        {/* <h1>Number of Assesment {numberOfAssesment}</h1> */}
        <h1
          style={{

          }}
        >
          Assesment Questions
        </h1>
        <Card
          sx={{
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {data?.form.map((item, index) =>
            item.type === "T" ? (
              <Grid key={`text-${index}`} item xs={12} style={{ margin: 15 }}>
                <Grid display="flex" item xs={12}>
                  <Grid item xs={11} style={{ margin: 15 }}>
                    <Typography variant="h5" gutterBottom>
                      Question {index + 1} : Text Question
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    {/* <Button style={{ color: 'red' }} onClick={() => onCloseQuestionDeleteHandler(index)}> */}
                    {/* &#10005;
                        </Button> */}
                  </Grid>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    required
                    disabled
                    margin="dense"
                    variant="standard"
                    placeholder="Question"
                    fullWidth
                    name="question"
                    value={item.question}
                    // onChange={(e) => onAssesmentQuestionNameInputChangeHandler(e, index)}
                    label="Question"
                  />
                </Grid>

                <Grid item xs={5}>
                  {/* <TextField
                    disabled
                    required="true"
                    margin="dense"
                    variant="standard"
                    placeholder="Enter Marks"
                    fullWidth
                    name="Marks"
                    value={item.marks}
                    label="Marks"
                    type="number"
                  /> */}
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    required="true"
                    disabled={disabled}
                    margin="dense"
                    variant="standard"
                    placeholder="Enter Answer"
                    fullWidth
                    name="answer"
                    label="Answer"
                    type="Answer"
                    // value={assesmentData ? assesmentData?.[index]?.candidateAnswer : copyData?.[index]?.candidateAnswer}
                    // value={copyData?.[index]?.candidateAnswer}
                    value={
                      disabled
                        ? assesmentData?.[index]?.candidateAnswer
                        : null
                    }
                    onChange={(e) => handleChange(e, index)}
                  />
                </Grid>
                {/* <Grid display="flex" alignItems="center" justifyContent="right" style={{ marginRight: 5 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        onClick={() => onQuestionDoneClicked(index)}
                      >
                        DONE
                      </Button>
                    </Grid> */}
              </Grid>
            ) : (
              <>
                <div>
                  {item.type === "S" || item.type === "R" ? (
                    <div key={`multiple-${index}`}>
                      <Grid item xs={12} style={{ margin: 15 }}>
                        <Grid display="flex" item xs={12}>
                          <Grid item xs={11}>
                            <Typography variant="h6" gutterBottom>
                              Question {index + 1} : Multiple Choice Question
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            {/* <Button style={{ color: 'red' }} onClick={() => onCloseQuestionDeleteHandler(index)}> */}
                            {/* &#10005; */}
                            {/* </Button> */}
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            disabled
                            margin="dense"
                            variant="standard"
                            placeholder="Question"
                            fullWidth
                            name="question"
                            value={item.question}
                            // onChange={(e) => onAssesmentQuestionNameInputChangeHandler(e, index)}
                            label="Question"
                          />
                        </Grid>
                        {/* <TextField
                                    disabled
                                    required
                                        margin="dense"
                                    variant="standard"
                                    placeholder={`Enter Option ${optIndex + 1}`}
                                    fullWidth
                                    name={opt}
                                    value={opt}
                                    // onChange={(e) => onAssesmentOptionInputChangeHandler(e, optIndex, index)}
                                    label={`Option ${optIndex + 1}`}
                                  /> */}
                        {disabled ? <>
                          <p>Choosed Answer</p>
                          {assesmentData.form?.[index]?.candidateAnswer}
                        </> : <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          // value={disabled? assesmentData?. : copyData?.[index]?.candidateAnswer}
                          // handleChange={(e)=>handleChange(e,)}
                          // defaultValue={disabled ? assesmentData?.[index]?.candidateAnswer : null}
                          >
                            {item.options.map((opt, optIndex) => (
                              <Grid
                                key={`options-${optIndex}`}
                                display="flex"
                                alignItems="end"
                                item
                                xs={12}
                              >
                                <Grid item xs={11}>
                                  <FormControlLabel
                                    name={opt}
                                    // checked={assesmentData?.[index]?.candidateAnswer}
                                    value={disabled ? "disabled" : optIndex + 1}
                                    control={<Radio />}
                                    label={opt}
                                    disabled={disabled}
                                    // handleChange={(e)=>handleChange(e,index)}
                                    onClick={(e) => disabled ? "" : handleChange(e, index)}
                                  />
                                </Grid>
                              </Grid>
                            ))}
                          </RadioGroup>
                        </FormControl>}
                      </Grid>

                      <Grid item xs={12} style={{ margin: 15 }}>
                        <Grid item display={"flex"} xs={12}>
                          {/* <Grid item xs={5} style={{ margin: '10px' }}>
                                <TextField
                                  disabled
                                  required
                                    margin="dense"
                                  variant="standard"
                                  placeholder="Enter Marks"
                                  fullWidth
                                  name="Marks"
                                  value={item.marks}
                                  // onChange={(e) => onAssesmentMarksInputChangeHandler(e, index)}
                                  label="Marks"
                                  type="number"
                                />
                              </Grid> */}
                          {/* {item?.type === 'S' || item?.type === 'R' ? ( */}
                          <>
                            {/* <Grid item xs={5} style={{ margin: '10px' }}>
                                    <TextField
                                      required
                                      margin="dense"
                                      variant="standard"
                                      placeholder="Enter Answer"
                                      fullWidth
                                      name="Answer"
                                      type="number"
                                      disabled={disabled}
                                      // value={assesmentData ? assesmentData?.[index]?.candidateAnswer : copyData?.[index]?.candidateAnswer}
                                      value={disabled ? assesmentData?.[index]?.candidateAnswer : copyData?.[index]?.candidateAnswer}                                    // value={item.answer}
                                      onChange={(e) => handleChange(e,index)}
                                      label="Answer"
                                    />
                                  </Grid> */}
                          </>
                          {/* ) : (
                                ''
                              )} */}
                        </Grid>
                      </Grid>
                      {/* <Grid display="flex" alignItems="center" justifyContent="right" style={{ marginRight: 5 }}>
                            <Button
                              variant="contained"
                              component={RouterLink}
                              to="#"
                              onClick={() => onQuestionDoneClicked(index)}
                            >
                              DONE
                            </Button>
                          </Grid> */}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {item.type === "S" || item.type === "C" ? (
                    <div key={`multiple-${index}`}>
                      <Grid item xs={12} style={{ margin: 15 }}>
                        <Grid display="flex" item xs={12}>
                          <Grid item xs={11}>
                            <Typography variant="h6" gutterBottom>
                              Question {index + 1} : Multiple Select Question
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            {/* <Button style={{ color: 'red' }} onClick={() => onCloseQuestionDeleteHandler(index)}> */}
                            {/* &#10005; */}
                            {/* </Button> */}
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            disabled
                            margin="dense"
                            variant="standard"
                            placeholder="Question"
                            fullWidth
                            name="question"
                            value={item.question}
                            // onChange={(e) => onAssesmentQuestionNameInputChangeHandler(e, index)}
                            label="Question"
                          />
                        </Grid>
                        {/* <TextField
                                    disabled
                                    required
                                        margin="dense"
                                    variant="standard"
                                    placeholder={`Enter Option ${optIndex + 1}`}
                                    fullWidth
                                    name={opt}
                                    value={opt}
                                    // onChange={(e) => onAssesmentOptionInputChangeHandler(e, optIndex, index)}
                                    label={`Option ${optIndex + 1}`}
                                  /> */}
                        {disabled ? <>
                          <p>Choosed Answer</p>
                          {assesmentData.form?.[index]?.candidateAnswer}
                        </> : <FormControl>
                          {/* <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            // value={disabled? assesmentData?. : copyData?.[index]?.candidateAnswer}
                            // handleChange={(e)=>handleChange(e,)}
                            // defaultValue={disabled ? assesmentData?.[index]?.candidateAnswer : null}
                          > */}
                          {item.options.map((opt, optIndex) => (
                            <Grid
                              key={`options-${optIndex}`}
                              display="flex"
                              alignItems="end"
                              item
                              xs={12}
                            >
                              <Grid item xs={11}>
                                <FormControlLabel

                                  name={opt}
                                  // checked={assesmentData?.[index]?.candidateAnswer}
                                  value={disabled ? "disabled" : optIndex + 1}
                                  control={<Checkbox />}
                                  label={opt}
                                  disabled={disabled}
                                  // handleChange={(e)=>handleChange(e,index)}
                                  onChange={(e) => disabled ? "" : handleChange(e, index)}
                                />
                              </Grid>
                            </Grid>
                          ))}
                          {/* </RadioGroup> */}
                        </FormControl>}
                      </Grid>

                      <Grid item xs={12} style={{ margin: 15 }}>
                        <Grid item display={"flex"} xs={12}>
                          {/* <Grid item xs={5} style={{ margin: '10px' }}>
                                <TextField
                                  disabled
                                  required
                                    margin="dense"
                                  variant="standard"
                                  placeholder="Enter Marks"
                                  fullWidth
                                  name="Marks"
                                  value={item.marks}
                                  // onChange={(e) => onAssesmentMarksInputChangeHandler(e, index)}
                                  label="Marks"
                                  type="number"
                                />
                              </Grid> */}
                          {/* {item?.type === 'S' || item?.type === 'R' ? ( */}
                          <>
                            {/* <Grid item xs={5} style={{ margin: '10px' }}>
                                    <TextField
                                      required
                                      margin="dense"
                                      variant="standard"
                                      placeholder="Enter Answer"
                                      fullWidth
                                      name="Answer"
                                      type="number"
                                      disabled={disabled}
                                      // value={assesmentData ? assesmentData?.[index]?.candidateAnswer : copyData?.[index]?.candidateAnswer}
                                      value={disabled ? assesmentData?.[index]?.candidateAnswer : copyData?.[index]?.candidateAnswer}                                    // value={item.answer}
                                      onChange={(e) => handleChange(e,index)}
                                      label="Answer"
                                    />
                                  </Grid> */}
                          </>
                          {/* ) : (
                                ''
                              )} */}
                        </Grid>
                      </Grid>
                      {/* <Grid display="flex" alignItems="center" justifyContent="right" style={{ marginRight: 5 }}>
                            <Button
                              variant="contained"
                              component={RouterLink}
                              to="#"
                              onClick={() => onQuestionDoneClicked(index)}
                            >
                              DONE
                            </Button>
                          </Grid> */}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )
          )}

          {/* <Stack sx={{
            padding: "5%"
          }}>
            <h3>
              1. Is this test Question 1?
            </h3>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} mb={5} ml={0} mr={0}>
              <FormControlLabel
                sx={{
                  backgroundColor: "#f9fafb",
                  marginRight: "0",
                  "&.MuiTypography-root": {
                    backgroundColor: '#f9fafb'
                  },
                  "&.MuiFormControlLabel-label": {
                    backgroundColor: '#f9fafb'
                  }
                }}
                value="IP"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd person</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="PC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
            </Stack>
          </Stack>
          <Stack sx={{
            padding: "5%"
          }}>
            <h3>
              1. Is this test Question 2?
            </h3>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} mb={5} ml={0} mr={0}>
              <FormControlLabel
                sx={{
                  backgroundColor: "#f9fafb",
                  marginRight: "0",
                  "&.MuiTypography-root": {
                    backgroundColor: '#f9fafb'
                  },
                  "&.MuiFormControlLabel-label": {
                    backgroundColor: '#f9fafb'
                  }
                }}
                value="IP"
                control={<Checkbox />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd person</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="PC"
                control={<Checkbox />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Checkbox />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Checkbox />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
            </Stack>
          </Stack>
          <Stack sx={{
            padding: "5%"
          }}>
            <h3>
              1. Is this test Question 3?
            </h3>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} mb={5} ml={0} mr={0}>
              <FormControlLabel
                sx={{
                  backgroundColor: "#f9fafb",
                  marginRight: "0",
                  "&.MuiTypography-root": {
                    backgroundColor: '#f9fafb'
                  },
                  "&.MuiFormControlLabel-label": {
                    backgroundColor: '#f9fafb'
                  }
                }}
                value="IP"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd person</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="PC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
            </Stack>
          </Stack>
          <Stack sx={{
            padding: "5%"
          }}>
            <h3>
              1. Is this test Question 4?
            </h3>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" width={500} mb={5} ml={0} mr={0}>
              <FormControlLabel
                sx={{
                  backgroundColor: "#f9fafb",
                  marginRight: "0",
                  "&.MuiTypography-root": {
                    backgroundColor: '#f9fafb'
                  },
                  "&.MuiFormControlLabel-label": {
                    backgroundColor: '#f9fafb'
                  }
                }}
                value="IP"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd person</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="PC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
              <FormControlLabel
                sx={{
                  marginLeft: "1%"
                }}
                value="VC"
                control={<Radio />}
                labelPlacement="end"
              />
              <p style={{ marginLeft: "0.5%" }}>abcd</p>
            </Stack>
          </Stack> */}
        </Card>
        <div
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {disabled || !data ? (
            ""
          ) : (
            <Button
              variant="contained"
              sx={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "5%"
              }}
              onClick={handleSubmit}
              hidden={disabled}
            >
              Submit
            </Button>

          )}
        </div>
      </Container>
    </div>
  );
}

export default CompleteAssesment;
