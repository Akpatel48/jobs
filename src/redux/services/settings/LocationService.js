import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getLocation: build.query({
            query: () => ({
                url: `${apiUrl.location}`,
                // headers: {
                //   'Authorization': `Bearer ${localStorage.getItem("globalUser").access}`
                // }
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
                }
            }),
        }),
        
    }),
    overrideExisting: false,
});

export const { useGetLocationQuery } = extendedApi;
