import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getCandidateList: build.query({
      query: () => ({
        url: `${apiUrl.candidate}candidate/`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    getCandidateDetails: build.query({
      query: (id) => ({
        url: `${apiUrl.candidate}applications/?id=${id}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    addApplyJob: build.mutation({
      query: (data) => ({
        url: `${apiUrl.candidate}apply/`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    addCandidateResume: build.mutation({
        query: (data) => ({
          url: `${apiUrl.candidate}resume-parse/`,
          method: 'POST',
          body: data,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
          }
        }),
      }),
    addCandidateDetails: build.mutation({
        query: (data) => ({
          url: `${apiUrl.candidate}create-candidate/`,
          method: 'POST',
          body: data,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
          }
        }),
      }),
    updateCandidate: build.mutation({
      query: (data) => ({
        url: `${apiUrl.candidate}applications/`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    deleteCandidate: build.mutation({
      query: (id) => ({
        url: `${apiUrl.candidate}applications/?id=${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    addCandidate: build.mutation({
      query: (data) => ({
        url: `${apiUrl.createCandidate}`,
        method: 'POST',
        body: data,
        // headers: {
        //   'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        // }
      })
    }),
    getCandidateById: build.query({
      query: (id) => ({
        url: `${apiUrl.candidate}create-candidates/${id}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    addCandidateWithResume: build.mutation({
      query: (data) => ({
        url: `${apiUrl.createCandidateWithResume}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      })
    })
  }),
  overrideExisting: false,
});

export const {
  useAddCandidateDetailsMutation,
  useGetCandidateListQuery,
  useGetCandidateDetailsQuery,
  useAddApplyJobMutation,
  useAddCandidateResumeMutation,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
  useAddCandidateMutation,
  useGetCandidateByIdQuery,
  useAddCandidateWithResumeMutation,
} = extendedApi;
