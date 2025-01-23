import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        departmentGet: build.query({
            query: (id) => ({
                url: id ? `${apiUrl.department}?company_id=${id}` : `${apiUrl.department}`,
            }),
        }),
        addDepartment: build.mutation({
            query: (data) => ({
                url: `${apiUrl.department}`,
                method: "POST",
                body: data,
            })
        }),
        updateDepartment: build.mutation({
            query: (data) => ({
                url: `${apiUrl.department}`,
                method: "POST",
                body: data,
            })
        }),
        deleteDepartment: build.mutation({
            query: (id) => ({
                url: `${apiUrl.department}?id=${id}`,
                method: "DELETE",
            })
        }),
    }),
    overrideExisting: false,
});

export const { useDepartmentGetQuery, useAddDepartmentMutation, useUpdateDepartmentMutation, useDeleteDepartmentMutation } = extendedApi;
