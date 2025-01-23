import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getStatusApi: build.query({
      query: (id) => ({
        url: `${apiUrl.status}?id=${id}`,
        mathod: 'GET',
      }),
    }),
    addStatusApi: build.mutation({
      query: (data) => ({
        url: `${apiUrl.status}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetStatusApiQuery, useAddStatusApiMutation } = extendedApi;
