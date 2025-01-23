import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
      getWebformFields: build.query({
        query: () => ({
          url: `${apiUrl.fields}`,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
          }
        }),
      }),
      addWebformFields: build.mutation({
        query: (data) => ({
          url: `${apiUrl.webform}`,
          method: 'POST',
          body: data,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
          }
        }),
      }),
      updateWebformFields: build.mutation({
        query: (data) => ({
          url: `${apiUrl.webform}`,
          method: 'POST',
          body: data,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
          }
        }),
      }),
    }),
    overrideExisting: false,
  });
  
  export const { useGetWebformFieldsQuery, useAddWebformFieldsMutation,useUpdateWebformFieldsMutation } = extendedApi;
  