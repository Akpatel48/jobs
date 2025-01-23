import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getAssesmentQuestions: build.query({
      query: (id) => ({
        url: `${apiUrl.assesmentQuestions}?id=${id}`,
      }),
    }),

    addAssesmentQuestions: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assesmentQuestions}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateAssesmentQuestions: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assesmentQuestions}`,
        method: 'POST',
        body: data,
      }),
    }),
    checkAssesmentQuestions: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assesmentQuestions}`,
        method: 'POST',
        body: data,
      }),
    }),
    selectAssesmentQuestions: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assesmentQuestions}`,
        method: 'POST',
        body: data,
      }),
    }),
    textAssesmentQuestions: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assesmentQuestions}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteAssesmentQuestions: build.mutation({
      query: (id) => ({
        url: `${apiUrl.assesmentQuestions}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssesmentQuestionsQuery,
  useAddAssesmentQuestionsMutation,
  useUpdateAssesmentQuestionsMutation,
  useDeleteAssesmentQuestionsMutation,
  useCheckAssesmentQuestionsMutation,
  useSelectAssesmentQuestionsMutation,
  useTextAssesmentQuestionsMutation,
} = extendedApi;
