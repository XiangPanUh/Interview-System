import {appConstants} from "../shared/constants";
import {PieChart} from "../shared/PieChart";

export const chartReducer = (state: PieChart | null = null, action: chartAction) => {
    switch (action.type) {
        case appConstants.GET_PIE_CHART:
            return action.payload.data;
        default: return state;
    }
}

interface chartAction {
    type: string,
    payload: {data: PieChart}
}