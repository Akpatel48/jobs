import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getInterviewListAll: build.query({
      query: () => ({
        url: `${apiUrl.interview}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    getInterviewListjob: build.query({
        query: (id) => ({
          url: `${apiUrl.interview}?id=${id}`,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
          }
          
        }),
      }),
    getInterviewListCandidate: build.query({
        query: (candidateId) => ({
          url: `${apiUrl.interview}?candidate_id=${candidateId}`,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
          }
        }),
      }),
    getInterviewDetails: build.query({
        query: (id) => ({
          url: `${apiUrl.interview}?id=${id}`,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
          }
        }),
      }),
    addInterview: build.mutation({
        query: (data) => ({
          url: `${apiUrl.interview}`,
          method: 'POST',
          body: data,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
          }
        }),
      }),
    updateInterview: build.mutation({
      query: (data) => ({
        url: `${apiUrl.interview}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    deleteInterview: build.mutation({
      query: (id) => ({
        url: `${apiUrl.interview}?id=${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInterviewListAllQuery,
  useGetInterviewListjobQuery,
  useGetInterviewListCandidateQuery,
  useGetInterviewDetailsQuery,
  useAddInterviewMutation,
  useUpdateInterviewMutation,
  useDeleteInterviewMutation,
} = extendedApi;
