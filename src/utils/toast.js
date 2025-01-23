/* eslint-disable default-param-last */
import { toast } from 'react-toastify';

const customId = "custom-id-yes";
export const showToast = (type = "success", msg) => {
    if (type === "success") {
        console.log("toast function me aaraha h")
        toast.success(msg, {
            theme: "colored",
            toastId: customId
        });
    } else if (type === "error") {
        toast.error(msg, {
            theme: "colored",
            toastId: customId
        });
    }
}