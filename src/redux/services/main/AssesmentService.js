import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getAssesment: build.query({
      query: (id) => ({
        url: `${apiUrl.assesment}${id}`,
      }),
    }),
    addAssesment: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assesment}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateAssesment: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assesment}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteAssesment: build.mutation({
      query: (id) => ({
        url: `${apiUrl.assesment}?id=${id}`,
        method: 'DELETE',
      }),
    }),
    getAssesmentCareer: build.query({
      query: (id) => ({
        url: `${apiUrl.assesmentCareer}${id}`,
      }),
    }),
    candidateApply: build.mutation({
      query:(data)=>({
        url:`${apiUrl.candidateApply}`,
        method: 'POST',
        body: data,
      }),     
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssesmentQuery,
  useAddAssesmentMutation,
  useUpdateAssesmentMutation,
  useDeleteAssesmentMutation,
  useGetAssesmentCareerQuery,
  useCandidateApplyMutation,
} = extendedApi;
