import {Interview} from "../shared/Interview";
import {appConstants} from "../shared/constants";

export const interviewsReducer = (state: Interview[] | null = null, action: interviewAction) => {
    switch (action.type) {
        case appConstants.GET_INTERVIEWS:
            return action.payload.data;
        case appConstants.ADD_INTERVIEW:
            return state;
        default: return state;
    }
}

interface interviewAction {
    type: string,
    payload: {data: Interview[]}
}