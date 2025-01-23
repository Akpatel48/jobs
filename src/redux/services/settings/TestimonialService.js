import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath?.injectEndpoints({
    endpoints: (build) => ({
        getTestimonials: build.query({
            query: () => ({
                url: apiUrl.testimonials,
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
                }
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetTestimonialsQuery } = extendedApi;