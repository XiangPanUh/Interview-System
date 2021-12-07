import {Interview} from "../shared/Interview";
import {appConstants} from "../shared/constants";

export const interviewReducer = (state: Interview | null = null, action: interviewAction) => {
    switch (action.type) {
        case appConstants.UPDATE_INTERVIEW:
            return state;
        default: return state;
    }
}

interface interviewAction {
    type: string,
    payload: {data: Interview}
}