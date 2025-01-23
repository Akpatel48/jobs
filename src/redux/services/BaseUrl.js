import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../utils/api';
// initialize an empty api service that we'll inject endpoints into later as needed


export const apiBasePath = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem("globalUser") || sessionStorage.getItem("globalUser"));
      // console.log(token)
      // If we have a token set in state, let's assume that we should be passing it.
      if (token && token.access) {
        headers.set('Authorization', `Bearer ${token.access}`)
      }
      else if(getState().login.authToken) {
        headers.set("Authorization", `Bearer ${getState().login.authToken}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
});
