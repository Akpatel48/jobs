import { isRejectedWithValue } from '@reduxjs/toolkit';
import { authAction } from "../auth/AuthReducer"

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        if (action.payload.status === 401) {
            // console.warn('We got a rejected action!');
            // console.log("action", action);
            // console.log("state", api.getState().login.auth);
            api.dispatch(authAction(false));
            // console.log("api", api);
            // console.log("next", next);
        }
    }

    return next(action)
}