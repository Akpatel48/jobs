import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
  endpoints: (build) => ({
    addRegister: build.mutation({
      query: (data) => {
        console.log(data)
        return {
          url: `${apiUrl.signUp}`,
          method: "POST",
          body: data,
          headers: {
            'Content-Type': "application/json"
          }
        }
      }
    }),
  }),
  overrideExisting: false,
});

export const { useAddRegisterMutation } = extendedApi; 

