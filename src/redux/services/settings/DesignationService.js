import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        designationGet: build.query({
            query: () => ({
                url: `${apiUrl.designation}`,
            }),
        }),
        addDesignation: build.mutation({
            query: (data) => ({
                url: `${apiUrl.designation}`,
                method: "POST",
                body: data,
            })
        }),
        updateDesignation: build.mutation({
            query: (data) => ({
                url: `${apiUrl.designation}`,
                method: "POST",
                body: data,
            })
        }),
        deleteDesignation: build.mutation({
            query: (id) => ({
                url: `${apiUrl.designation}?id=${id}`,
                method: "DELETE",
            })
        }),
        designationCareerGet: build.query({
            query: () => ({
                url: `${apiUrl.designationCareer}`,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useDesignationGetQuery, useAddDesignationMutation, useUpdateDesignationMutation, useDeleteDesignationMutation, useDesignationCareerGetQuery } = extendedApi;