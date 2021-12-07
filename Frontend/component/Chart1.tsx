import React, {Component} from "react";
import {getBar} from "../action/chartAction";
import {ReduxState} from "../shared/constants";
import {connect} from "react-redux";
import {Bar} from 'react-chartjs-2';
import {bindActionCreators, Dispatch} from "redux";
import {BarChart} from "../shared/BarChart";

class Chart1 extends Component<barProps, barState> {
    componentDidMount() {
        this.props.getBar();
    }

    static getDerivedStateFromProps(props:barProps, state:barState) {
        if (state.datasets !== null) {
            return {datasets: [{
                    label: 'Pass Rate',
                    data: [props.bar?.Peter, props.bar?.Gregory,props.bar?.Robert,props.bar?.Taylor],
                    backgroundColor: ['green']
                }]
            }
        }
        else {
            return {datasets: state.datasets}
        }
    }
    constructor(props: barProps) {
        super(props);
        this.state= {
            labels: ['Peter','Gregory','Robert','Taylor'],
            datasets: [{
                label: 'Pass Rate',
                data: [this.props.bar?.Peter, this.props.bar?.Gregory,this.props.bar?.Robert,this.props.bar?.Taylor],
                backgroundColor: ['green']
            }],
        }
    }

    render() {
        return(
            <div>
                <h1>Passing Rate</h1>
                <div style={{width:"30%"}}>
                    <Bar
                        data={{
                            labels: this.state.labels,
                            datasets: this.state.datasets
                        }}
                    /></div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        getBar
    }, dispatch)
}

const mapStateToProps =({bar}: ReduxState) => {
    return {bar}
}

export default connect (mapStateToProps,mapDispatchToProps)(Chart1)

interface barProps {
    bar: BarChart;
    getBar:() => object,
}

interface barState {
    labels: any
    datasets: any
}