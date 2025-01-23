import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    addLogin: build.mutation({
      query: (data) => ({
        url: `${apiUrl.signIn}`,
        method: "POST",
        body: data,
      }),
      transformResponse: (data) => {
        console.log(data)
        localStorage.setItem("globalUser", data)
        return data
      }
    }),
  }),
  overrideExisting: false,
});

export const { useAddLoginMutation } = extendedApi;
