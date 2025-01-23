import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getCandidateNotesList: build.query({
      query: (candidateId) => ({
        url: `${apiUrl.notes}?candidate=${candidateId}`,
      }),
    }),
    getJobNotesList: build.query({
      query: (jobId) => ({
        url: `${apiUrl.notes}?job=${jobId}`,
      }),
    }),
    getNotesTypes: build.query({
      query: () => ({
        url: `${apiUrl.notesType}`,
      }),
    }),
    addCandidateNotes: build.mutation({
      query: (data) => ({
        url: `${apiUrl.notes}`,
        method: 'POST',
        body: data,
      }),
    }),
    addJobNotes: build.mutation({
      query: (data) => ({
        url: `${apiUrl.notes}`,
        method: 'POST',
        body: data,
      }),
    }),

    updateCandidateNotes: build.mutation({
      query: (data) => ({
        url: `${apiUrl.notes}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateJobNotes: build.mutation({
      query: (data) => ({
        url: `${apiUrl.notes}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteCandidateNotes: build.mutation({
      query: (id) => ({
        url: `${apiUrl.notes}?id=${id}`,
        method: 'DELETE',
      }),
    }),
    deleteJobNotes: build.mutation({
      query: (id) => ({
        url: `${apiUrl.notes}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCandidateNotesListQuery,
  useGetNotesTypesQuery,
  useGetJobNotesListQuery,
  useAddCandidateNotesMutation,
  useAddJobNotesMutation,
  useUpdateCandidateNotesMutation,
  useUpdateJobNotesMutation,
  useDeleteCandidateNotesMutation,
  useDeleteJobNotesMutation,
} = extendedApi;
