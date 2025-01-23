import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getPipeline: build.query({
      query: () => ({
        url: `${apiUrl.pipeline}`,
      }),
    }),
    addPipelineApi: build.mutation({
      query: (data) => ({
        url: `${apiUrl.pipeline}`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePipelineApi: build.mutation({
      query: (data) => ({
        url: `${apiUrl.pipeline}`,
        method: 'POST',
        body: data,
      }),
    }),
    deletePipelineApi: build.mutation({
      query: (id) => ({
        url: `${apiUrl.pipeline}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPipelineQuery,
  useAddPipelineApiMutation,
  useUpdatePipelineApiMutation,
  useDeletePipelineApiMutation,
} = extendedApi;
