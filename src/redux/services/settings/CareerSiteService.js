import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';



const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getCompanyInfo: build.query({
            query: () => {
                // const token = JSON.parse(localStorage.getItem("globalUser"))?.access;
                return {
                    url: `${apiUrl.companyInfoCareer}`,
                    // headers: {
                    //     'Authorization': `Bearer ${token}`
                    // }
                };
            }
        }),
        updateCompanyInfo: build.mutation({
            query: (data) => ({
                url: `${apiUrl.companyInfo}`,
                method: "POST",
                body: data,
            })
        }),
        updateCompanyLogo: build.mutation({
            query: (data) => ({
                url: `${apiUrl.companyLogo}`,
                method: "POST",
                body: data,
            })
        }),
        getCareerSiteCompanyData: build.query({
            query: (id) => {
                return {
                    url: `${apiUrl.CareerSiteCompanyData}?id=${id}`,
                };
            }
        }),

    }),
    overrideExisting: false,

});

export const { useGetCompanyInfoQuery, useUpdateCompanyInfoMutation, useUpdateCompanyLogoMutation, useGetCareerSiteCompanyDataQuery } = extendedApi;
