const baseUrl = 'http://localhost:8000/';
// const baseUrl = 'https://api.edjobster.com/';
// const baseUrl = 'https://staging-api.edjobster.com/';

const   apiUrl = {
  signIn: `${baseUrl}account/sign-in/`,
  department: `${baseUrl}settings/department/`,
  degree: `${baseUrl}settings/degree/`,
  designation: `${baseUrl}settings/designation/`,
  companyInfo: `${baseUrl}account/company-info/`,
  companyInfoCareer: `${baseUrl}account/company-info-career/`,
  companyLogo: `${baseUrl}account/company-logo/`,
  country: `${baseUrl}common/countires/`,
  state: `${baseUrl}common/states/?id=`,
  city: `${baseUrl}common/cities/?id=`,
  address: `${baseUrl}settings/location/`,
  addressCareer: `${baseUrl}settings/location-career/`,
  user: `${baseUrl}account/members/`,
  userUpdate: `${baseUrl}account/update-account/`,
  userPhoto: `${baseUrl}account/member-photo/`,
  activateUser: `${baseUrl}account/activate-member/`,
  deleteUser: `${baseUrl}account/members/`,
  userRole: `${baseUrl}account/member-role/`,
  stage: `${baseUrl}settings/pipeline-stage/`,
  status: `${baseUrl}settings/pipeline-details/`,
  pipeline: `${baseUrl}settings/pipeline/`,
  emailCategory: `${baseUrl}settings/email-category/`,
  emailtamplate: `${baseUrl}settings/email-template/`,
  emailVariables: `${baseUrl}settings/email-field/`,
  webform: `${baseUrl}settings/webform/`,
  fields: `${baseUrl}settings/webform-fields/`,
  assementCategory: `${baseUrl}jobs/assesment-category/`,
  assesment:`${baseUrl}jobs/assesment/`,
  assesmentCareer:`${baseUrl}jobs/assesment-career/`,
  assesmentQuestions: `${baseUrl}jobs/assesment-question/`,
  jobs: `${baseUrl}jobs/`,  
  candidate:`${baseUrl}candidate/`,
  createCandidate: `${baseUrl}candidate/create-candidates/`,
  createCandidateWithResume: `${baseUrl}candidate/create-candidate/`,
  interview:`${baseUrl}interview/schedule/`,
  location:`${baseUrl}settings/location/`,  
  notes: `${baseUrl}candidate/notes/`,
  notesType:`${baseUrl}common/note-types/`,
  signUp: `${baseUrl}account/sign-up/`,
  approveUser: `${baseUrl}account/approve-user/`,
  candidateApply: `${baseUrl}candidate/applicant/`,
  testimonials: `${baseUrl}settings/testimonials/`,
  jobCompanies:`${baseUrl}jobs/job-by-company`,
  candidateParseResume: `${baseUrl}candidate/ParseResume/`,
  CareerSiteCompanyData: `${baseUrl}account/careersite-company-details/`,
  skill:`${baseUrl}candidate/skill/`,         
  subject:`${baseUrl}candidate/subject-specialization/`,
  degreeCareer:`${baseUrl}settings/DesignationCareer/`,  
  designationCareer:`${baseUrl}settings/DegreeCareer/`, 
  BackgroundImage: `${baseUrl}account/careersite-company-details/` 

};

export { baseUrl, apiUrl };
