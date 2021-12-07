import {appConstants} from "../shared/constants";
import {AxiosResponse} from "axios";

export const authReducer = (state:any = initialState, action: authReducerAction) => {
    switch (action.type) {
        case appConstants.LOGIN:
            localStorage.setItem("flag", "true");
            return action.payload.data.success?{}:null;
        case appConstants.LOGOUT:
            localStorage.setItem("flag", "false");
            return null;
        default:
            return state;
    }
}
let initialState = {
    username:'',
    password:''
}

interface authReducerAction {
    type: string,
    payload: AxiosResponse<any>
}
