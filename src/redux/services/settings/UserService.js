import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getUsersApi: build.query({
            query: () => ({
                url: `${apiUrl.user}`,
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
                }
            }),
        }),
        addUserApi: build.mutation({
            query: (data) => ({
                url: `${apiUrl.user}`,
                method: "POST",
                body: data,
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
                }
            })
        }),
        updateUserApi: build.mutation({
            query: (data) => ({
                url: `${apiUrl.approveUser}`,
                method: "POST",
                body: data,
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
                }
            })
        }),
        deleteUserApi: build.mutation({
            query: (id) => ({
                url: `${apiUrl.user}?account_id=${id}`,
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
                }
            })
        }),
        activateDeactivateUserApi: build.mutation({
            query:(data)=>({
                url :`${apiUrl.activateUser}`,
                method:"POST",
                body:data,
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
                }
            })
        })

    }),
    overrideExisting: false,
});
export const { useGetUsersApiQuery, useAddUserApiMutation, useUpdateUserApiMutation, useDeleteUserApiMutation,useActivateDeactivateUserApiMutation } = extendedApi;
