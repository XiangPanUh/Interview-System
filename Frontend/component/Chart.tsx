import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import {bindActionCreators, Dispatch} from "redux";
import {getPie} from "../action/chartAction";
import {connect} from "react-redux";
import {PieChart} from "../shared/PieChart";
import {ReduxState} from "../shared/constants";
import Chart1 from "./Chart1";

class Chart extends Component<chartProps, chartState> {
    componentDidMount() {
        this.props.getPie();
    }

    static getDerivedStateFromProps(props:chartProps, state:chartState) {
        if (state.datasets !== null) {
            return {datasets: [{
                    data: [props.pie?.Pass, props.pie?.Canceled, props.pie?.Fail,props.pie?.Pending],
                    backgroundColor: ['red','blue','green', 'yellow']
                }]
            }
        }
        else {
            return {datasets: state.datasets}
        }
    }
    constructor(props: chartProps) {
        super(props);
        this.state= {
            labels: ['Pass','Canceled','Fail', 'Pending'],
            datasets: [{
                data: [this.props.pie?.Pass, this.props.pie?.Canceled, this.props.pie?.Fail, this.props.pie?.Pending],
                backgroundColor: ['red','blue','green', 'yellow']
            }],
        }
    }

    render() {
        return(
            <div>
                <h1>Status of All Interviews</h1>
                <div style={{width:"30%"}}>
                <Pie
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets
                    }}
                /></div>
                <Chart1/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        getPie
    }, dispatch)
}

const mapStateToProps =({pie}: ReduxState) => {
    return {pie}
}

export default connect (mapStateToProps,mapDispatchToProps)(Chart)

interface chartProps {
    pie: PieChart;
    getPie: () => object,
}

interface chartState {
    labels: any
    datasets: any
}