import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const globalUser = JSON.parse(localStorage.getItem("globalUser"));
const accessToken = globalUser ? globalUser.access : null;

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getJobList: build.query({
      query: () => ({
        url: `${apiUrl.jobs}all-jobs`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }),
    }),
    getJobDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.jobs}job-details/${id}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }),
    }),
    getJobsByCompany: build.query({
      query: (id) => ({
        url: `${apiUrl.jobCompanies}/${id}`,
        // headers: {
        //   'Authorization': `Bearer ${accessToken}`
        // }
      }),
    }),
    getFilterJobs: build.query({
      query: ({ title, location, experience }) => ({
        url: `${apiUrl.jobs}latest-jobs`,
        params: { title, location, experience },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetJobListQuery,
  useGetJobDetailsQuery,
  useGetJobsByCompanyQuery,
  useGetFilterJobsQuery
} = extendedApi;
