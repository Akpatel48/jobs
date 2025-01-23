import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getCountry: build.query({
            query: () => ({
                url: `${apiUrl.country}`,
                // headers: {
                //   'Authorization': `Bearer ${localStorage.getItem("globalUser")?.access}`
                // }
            }),
        }),
        getState: build.query({
            query: (id) => `${apiUrl.state}${id}`,
            // headers: {
            //   'Authorization': `Bearer ${localStorage.getItem("globalUser")?.access}`
            // }
        }),
        getCity: build.query({
            query: (id) => `${apiUrl.city}${id}`,
            // headers: {
            //   'Authorization': `Bearer ${localStorage.getItem("globalUser")?.access}`
            // }
        }),
    }),
    overrideExisting: false,
});

export const { useGetCountryQuery, useGetStateQuery, useGetCityQuery } = extendedApi;
