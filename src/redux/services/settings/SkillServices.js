import { apiBasePath } from '../BaseUrl';
import { apiUrl } from '../../../utils/api';

const extendedApi = apiBasePath.injectEndpoints({
    endpoints: (build) => ({
        getSkillList: build.query({
            query: () => ({
                url: `${apiUrl.skill}`,
            }),
        }),
        getSubjectList: build.query({
            query: () => ({
                url: `${apiUrl.subject}`,
            }),
        })
    }),
    overrideExisting: false,
});
export const { 
    useGetSkillListQuery, 
    useGetSubjectListQuery, 
} = extendedApi;
