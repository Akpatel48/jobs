import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getAddresses: build.query({
            query: () => ({
                url: `${apiUrl.address}`,
            }),
        }),
        addAddresses: build.mutation({
            query: (data) => ({
                url: `${apiUrl.address}`,
                method: "POST",
                body: data,
            })
        }),
        updateAddresses: build.mutation({
            query: (data) => ({
                url: `${apiUrl.address}`,
                method: "POST",
                body: data,
            })
        }),
        deleteAddresses: build.mutation({
            query: (id) => ({
                url: `${apiUrl.address}?id=${id}`,
                method: "DELETE",
            })
        }),
        getAddresseDetails: build.query({
            query: (id) => ({
                url: `${apiUrl.addressCareer}${id}`,
            }),
        }),
    }),
    overrideExisting: false,
});
export const { useGetAddressesQuery, useDeleteAddressesMutation, useAddAddressesMutation, useUpdateAddressesMutation,
    useGetAddresseDetailsQuery
} = extendedApi;
