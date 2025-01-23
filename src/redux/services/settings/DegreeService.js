import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        degreeGet: build.query({
            query: () => ({
                url: `${apiUrl.degree}`,
            }),
        }),
        addDegree: build.mutation({
            query: (data) => ({
                url: `${apiUrl.degree}`,
                method: "POST",
                body: data,
            })
        }),
        updateDegree: build.mutation({
            query: (data) => ({
                url: `${apiUrl.degree}`,
                method: "POST",
                body: data,
            })
        }),
        deleteDegree: build.mutation({
            query: (id) => ({
                url: `${apiUrl.degree}?id=${id}`,
                method: "DELETE",
            })
        }),
        degreeCareerGet: build.query({
            query: () => ({
                url: `${apiUrl.degreeCareer}`,
            }),
        }),
    }),
    overrideExisting: false,
});
export const { 
    useDegreeGetQuery, 
    useAddDegreeMutation, 
    useUpdateDegreeMutation, 
    useDeleteDegreeMutation,
    useDegreeCareerGetQuery
} = extendedApi;
