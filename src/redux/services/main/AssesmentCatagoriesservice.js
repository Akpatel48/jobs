import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getAssesmentCategory: build.query({
      query: () => ({
        url: `${apiUrl.assementCategory}`,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),

    addAssesmentCategory: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assementCategory}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
    updateAssesmentCategory: build.mutation({
      query: (data) => ({
        url: `${apiUrl.assementCategory}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
    deleteAssesmentCategory: build.mutation({
      query: (id) => ({
        url: `${apiUrl.assementCategory}?id=${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        }
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAssesmentCategoryQuery,
  useAddAssesmentCategoryMutation,
  useUpdateAssesmentCategoryMutation,
  useDeleteAssesmentCategoryMutation,
} = extendedApi;
