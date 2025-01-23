import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    getStages: build.query({
      query: () => ({
        url: `${apiUrl.stage}`,
      }),
    }),
    addStageApi: build.mutation({
      query: (data) => ({
        url: `${apiUrl.stage}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateStageApi: build.mutation({
      query: (data) => ({
        url: `${apiUrl.stage}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteStageApi: build.mutation({
      query: (id) => ({
        url: `${apiUrl.stage}?id=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetStagesQuery, 
  useAddStageApiMutation, 
  useUpdateStageApiMutation, 
  useDeleteStageApiMutation 
} = extendedApi;
