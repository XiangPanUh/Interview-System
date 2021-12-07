import {appConstants} from "../shared/constants";
import {BarChart} from "../shared/BarChart";

export const barChartReducer = (state: BarChart | null = null, action: chartAction) => {
    switch (action.type) {
        case appConstants.GET_BAR_CHART:
            return action.payload.data;
        default: return state;
    }
}

interface chartAction {
    type: string,
    payload: {data: BarChart}
}