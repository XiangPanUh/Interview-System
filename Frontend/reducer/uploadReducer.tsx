import {appConstants} from "../shared/constants";
import {AxiosResponse} from "axios";


export const uploadReducer = (state: FormData | null = null, action: uploadAction) => {
    switch (action.type) {
        case appConstants.UPLOAD_FILE:
            return state;
        case appConstants.UPLOAD_EXCEL:
            return state;
        default: return state;
    }
}

interface uploadAction {
    type: string,
    payload: AxiosResponse<any>
}