import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getEmailCategory: build.query({
      query: () => ({
        url: `${apiUrl.emailCategory}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    addEmailCategory: build.mutation({
      query: (data) => ({
        url: `${apiUrl.emailCategory}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    updateEmailCategory: build.mutation({
      query: (data) => ({
        url: `${apiUrl.emailCategory}`,
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
        }
      }),
    }),
    deleteEmailCategory: build.mutation({
      query: (id) => ({
        url: `${apiUrl.emailCategory}?id=${id}`,
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
  useGetEmailCategoryQuery,
  useAddEmailCategoryMutation,
  useUpdateEmailCategoryMutation,
  useDeleteEmailCategoryMutation,
} = extendedApi;
