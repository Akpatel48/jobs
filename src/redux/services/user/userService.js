import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: build => ({
        getUserList: build.mutation({
            query: () => ({
                url: apiUrl.user
            })
        }),
        addUser: build.mutation({
            query: (data) => ({
                url: apiUrl.user,
                method: "POST",
                body: data
            })
        }),
        updateUser: build.mutation({
            query: (data) => ({
                url: apiUrl.userUpdate,
                method: "POST",
                body: data
            })
        }),
        userPhoto: build.mutation({
            query: (data) => ({
                url: apiUrl.userPhoto,
                method: "POST",
                body: data
            })
        }),
        userRole: build.mutation({
            query: (data) => ({
                url: apiUrl.userRole,
                method: "POST",
                body: data
            })
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `${apiUrl.deleteUser}?account_id=${id}`,
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json"
                } 
            })
        })
    }),
    overrideExisting: false
})

export const {
    useAddUserMutation
} = extendedApi;