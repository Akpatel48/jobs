import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getJob: build.query({
      query: () => ({
        url: `${apiUrl.jobs}all-jobs?page=1`,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
    getJobeDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.jobs}job-details/${id}`,
        // headers: {
        //   'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        // }
      }),
    }),
    getJobDetailsCareer: build.query({
      query: (id) => ({
        url: `${apiUrl.jobs}job-details-career/${id}`,
        // headers: {
        //   'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        // }
      }),
    }),
   
    addJob: build.mutation({
      query: (data) => ({
        url: `${apiUrl.jobs}job/`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),

    deleteJob: build.mutation({
      query: (id) => ({
        url: `${apiUrl.jobs}job/?id=${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
    createAssesment: build.mutation({
      query: (data) => ({
        url: `${apiUrl.jobs}assesment/`,
        body: data,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      })
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetJobQuery,
  useGetJobeDetailsQuery,
  useGetJobDetailsCareerQuery,
  useAddJobMutation,
  useDeleteJobMutation,
  useCreateAssesmentMutation,
} = extendedApi;
