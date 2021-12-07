import {connect} from "react-redux";
import {appConstants} from "../shared/constants";
import {Component, SyntheticEvent, useEffect, useState} from "react";
import {getInterviews, updateInterview} from "../action/interviewAction";
import {Link, RouteComponentProps} from "react-router-dom";
import { Interview } from "../shared/Interview";
import {bindActionCreators, Dispatch} from "redux";
import {Pagination } from "antd";
import {uploadExcel, uploadFile} from "../action/fileAction";

class Interviews extends Component<interviewProps, interviewState>  {
    componentDidMount() {
        setTimeout(()=>{
            this.props.getInterviews();
        },5000)
        this.props.getInterviews();
    }
    constructor(props: interviewProps) {
        super(props);
        this.state = {
            interviews: props.interviews,
            interview: props.interview,
            minValue: 0,
            maxValue: 10,
            selectedFile: null,
            flag: 0,
        }
    }

    static getDerivedStateFromProps(props: interviewProps, state: interviewState) {
        if (state.interviews === null) {
            return {interviews : props.interviews}
        }
        else {
            return {interviews: state.interviews}
        }
    }
    componentDidUpdate(prevProps: Readonly<interviewProps>, prevState: Readonly<interviewState>, snapshot?: any) {
        if (prevState.flag !== this.state.flag) {
            console.log(this.state.flag);
            console.log(prevState.flag);
            this.props.getInterviews();
            this.forceUpdateHandler();
        }
    }

    sortByIdAsc=(event:SyntheticEvent)=> {
        event.preventDefault();
        this.setState(prevState => {
            this.state.interviews.sort((a, b) => (a.id - b.id))
        });
        this.forceUpdate();
    }

    sortByIdDesc=(event:SyntheticEvent)=> {
        event.preventDefault();
        this.setState(prevState => {
            this.state.interviews.sort((a, b) => (b.id - a.id))
        });
        this.forceUpdate();
    }
    sortByNameAsc=(event:SyntheticEvent)=> {
        event.preventDefault();
        this.setState(prevState => {
            this.state.interviews.sort((a, b) => a.candidate.localeCompare(b.candidate))
        });
        this.forceUpdate();
    }
    sortByNameDesc=(event:SyntheticEvent)=> {
        event.preventDefault();
        this.setState(prevState => {
            this.state.interviews.sort((a, b) => b.candidate.localeCompare(a.candidate))
        });
        this.forceUpdate();
    }
    sortByPhoneAsc=(event:SyntheticEvent)=> {
        event.preventDefault();
        this.setState(prevState => {
            this.state.interviews.sort((a, b) => a.phone.localeCompare(b.phone))
        });
        this.forceUpdate();
    }

    sortByPhoneDesc=(event:SyntheticEvent)=> {
        event.preventDefault();
        this.setState(prevState => {
            this.state.interviews.sort((a, b) => b.phone.localeCompare(a.phone))
        });
        this.forceUpdate();
    }
    sortBySchedulerAsc=(event:SyntheticEvent)=> {
        event.preventDefault();
        this.setState(prevState => {
            this.state.interviews.sort((a, b) => a.scheduler.localeCompare(b.scheduler))
        });
        this.forceUpdate();
    }

    sortBySchedulerDesc=(event:SyntheticEvent)=> {
        event.preventDefault();
        this.setState(prevState => {
            this.state.interviews.sort((a, b) => b.scheduler.localeCompare(a.scheduler))
        });
        this.forceUpdate();
    }
    sortByDateAsc=(event:SyntheticEvent)=>{
        event.preventDefault();
        this.setState(prevState => {
            this.state.interviews.sort((a, b) => new Date(a.time)> new Date(b.time)?1:-1)
        });
        this.forceUpdate();
    }

    sortByDateDesc=(event:SyntheticEvent)=>{
        event.preventDefault();
        this.setState(prevState => {
            this.state.interviews.sort((a, b) => new Date(b.time)> new Date(a.time)?1:-1)
        });
        this.forceUpdate();
    }


    GetAllHandler=(event:SyntheticEvent) =>{
        event.preventDefault();
        const get = this.props.interviews;
        this.setState({
            interviews:get
        })
    }
    PendingHandler =(event: SyntheticEvent) =>{
        event.preventDefault();
        let pend = this.props.interviews.filter(function(e){
            return e.status.toString() === "Pending";
        });
        this.setState({
            interviews:pend
        })
    }
    PassedHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        let pass =this.props.interviews.filter(function(e) {
            return e.status.toString() ==="Pass"
        })
        this.setState({
            interviews:pass
        })
    }
    FailedHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        let fail =this.props.interviews.filter(function(e) {
            return e.status.toString() ==="Fail"
        })
        this.setState({
            interviews:fail
        })
    }
    CanceledHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        let cancel =this.props.interviews.filter(function(e) {
            return e.status.toString() ==="Canceled"
        })
        this.setState({
            interviews:cancel
        })
    }

    SearchHandler=(event: SyntheticEvent)=> {
        event.preventDefault();
        let type = (event.target as HTMLInputElement).value.toLowerCase().toString();
        if (type.length !== 0) {
            if (!isNaN(+type)) {
                let temp = this.state.interviews.filter(function (e) {
                    return e.phone.startsWith(type);
                });
                this.setState({
                    interviews: temp
                })
            } else {
                let temp = this.state.interviews.filter(function (e) {
                    return e.candidate.toString().toLowerCase().startsWith(type);
                });
                this.setState({
                    interviews: temp
                })
            }
        } else {
            const get = this.props.interviews;
            this.setState({
                interviews: get
            })
        }
    }
    fieldChangeHandler=(event:SyntheticEvent) => {};
    uploadHandler=(event:SyntheticEvent)=>{};
    getFileHandler=(event:SyntheticEvent)=>{};
    forceUpdateHandler() {
        this.forceUpdate();
    }
    handleChange = (page: any, pageSize: any) => {
        if (this.state.interviews.length <= pageSize) {
            this.setState({
                minValue: 0,
                maxValue: pageSize,
            });
        } else {
            this.setState({
                minValue: (page-1) * pageSize,
                maxValue: (page-1) * pageSize + pageSize
            });
        }
    };

    onFileChange=(event: SyntheticEvent)=>{
        // @ts-ignore
        let value = event.target.files[0];
        this.setState({
            selectedFile: value
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.GetAllHandler}>All Appointments</button>
                <button onClick={this.PendingHandler}>Pending</button>
                <button onClick={this.CanceledHandler}>Canceled</button>
                <button onClick={this.PassedHandler}>Passed</button>
                <button onClick={this.FailedHandler}>Failed</button>
                <button>
                    <Link to={appConstants.addInterviewRoute}>Add New Interview</Link>
                </button>
                {localStorage.getItem('hr') !== 'false' &&
                <button>
                    <Link to={appConstants.chartRoute}>Interview Status Charts</Link>
                </button>
                }
                {localStorage.getItem('hr') !=='false' &&
                <div>
                    <div><input type="file" name='file' onChange={this.onFileChange}/></div>
                    <button onClick={this.uploadHandler=(event: SyntheticEvent)=> {
                        event.preventDefault();
                        const formData = new FormData();
                        formData.append(
                            "file",
                            this.state.selectedFile,
                        )
                        this.props.uploadExcel(formData);
                        this.props.history.push(appConstants.uploadedRoute);
                    }}>Upload</button>
                </div>}

                <div>
                    <span >Enter Name / Phone : </span>
                    <input type="text" onChange={this.SearchHandler}/>
                </div>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>
                            <button onClick={this.sortByIdAsc}>˄</button>ID<button onClick={this.sortByIdDesc}>˅</button>
                        </th>
                        <th>
                            <button onClick={this.sortByDateAsc}>˄</button>Time<button onClick={this.sortByDateDesc}>˅</button>
                        </th>
                        <th>
                            <button onClick={this.sortByNameAsc}>˄</button>Candidate<button onClick={this.sortByNameDesc}>˅</button>
                        </th>
                        <th>
                        <button onClick={this.sortByPhoneAsc}>˄</button>Phone<button onClick={this.sortByPhoneDesc}>˅</button>
                        </th>
                        <th>
                            <button onClick={this.sortBySchedulerAsc}>˄</button>Scheduler<button onClick={this.sortBySchedulerDesc}>˅</button>
                        </th>
                        <th>Status</th>
                        <th>Resume</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.interviews?.length > 0 &&
                        this.state.interviews?.slice(this.state.minValue, this.state.maxValue).map(i => (
                            <tr key={i.id}>
                                <td>{i.id}</td>
                                <td>{(new Date(i.time)).toISOString().slice(0,10)+" "+
                                (new Date(i.time)).toISOString().slice(11,16)}</td>
                                <td>{i.candidate}</td>
                                <td>{i.phone}</td>
                                <td>{i.scheduler}</td>
                                <td><select
                                    id='status'
                                    name='status'
                                    value={i.status as keyof Interview}
                                    onChange={this.fieldChangeHandler=(event:SyntheticEvent) => {
                                        const element = event.target as HTMLSelectElement;
                                        const value = element.value;
                                        const newInterview = i;
                                        newInterview.status = value;
                                        this.setState({
                                            interview: newInterview,
                                            flag: this.state.flag + 1
                                        });
                                        this.props.updateInterview(this.state.interview)
                                        this.forceUpdateHandler();
                                    }}
                                >
                                    <option>{i.status}</option>
                                    <option>Pending</option>
                                    <option>Failed</option>
                                    <option>Pass</option>
                                    <option>Canceled</option>
                                </select></td>
                                <td>
                                    <div>File to upload:</div>
                                    <div><input type="file" name='file' onChange={this.onFileChange}/></div>
                                    <button onClick={this.uploadHandler=(event: SyntheticEvent)=> {
                                        event.preventDefault();
                                        const formData = new FormData();
                                        formData.append(
                                            "file",
                                            this.state.selectedFile,
                                        )
                                        this.props.uploadFile(formData, i.id);
                                        this.props.history.push(appConstants.uploadedRoute);
                                    }}>∆</button>
                                    <a href={"http://127.0.0.1:8090/" + i.resume} target="-blank" download>◯</a>
                                    <button>∇</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <Pagination
                    showSizeChanger
                    defaultCurrent={1}
                    defaultPagesize={10}
                    pageSizeOptions={['5','10','25']}
                    onChange={this.handleChange}
                    total={this.state.interviews?.length}
                />
                <button type="submit" className="btn btn-light">
                    <Link to={appConstants.addInterviewRoute}>New Interview</Link></button>
            </div>
        )
    }
}
const mapStateToProps =(state: interviewState) => {
    return {
        interviews: state.interviews,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        getInterviews,
        updateInterview,
        uploadFile,
        uploadExcel,
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Interviews)

interface interviewProps extends RouteComponentProps{
    interviews: Interview[],
    interview: Interview,
    getInterviews: () => object,
    updateInterview: (interview: Interview) => void,
    uploadFile: (formData: FormData, id: number)=> void,
    uploadExcel: (formData: FormData)=> void,
}
interface interviewState {
    interviews: Interview[],
    interview: Interview,
    minValue: number,
    maxValue: number,
    selectedFile: any,
    flag: number,
}