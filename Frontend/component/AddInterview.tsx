import {connect} from "react-redux";
import {Component} from "react";
import {appConstants, ReduxState} from "../shared/constants";
import {Interview} from "../shared/Interview";
import {Field, FieldProps, Form, Formik} from "formik";
import * as yup from 'yup';
import {addInterview} from "../action/interviewAction";
import {Link} from "react-router-dom";


const addInterviewSchema = yup.object().shape({
    time: yup.date().required('Time is required'),
    email: yup.string().email('Please enter correct email').required('email is required'),
    candidate: yup.string().required('Candidate name is required'),
    scheduler: yup.string().required('Scheduler is required'),
    phone: yup.string().required('Phone number is required').length(10),
})

const date = new Date();

class AddInterview extends Component<AddInterviewProps, AddInterviewState> {
    constructor(props: AddInterviewProps) {
        super(props);
        const constructInterviewField = (): Interview =>{
            const InterviewField = new Map();
            appConstants.INTERVIEW_FIELD.forEach(field => {
                InterviewField.set(field.name,'');
            });
            return Object.fromEntries(InterviewField);
        }
        this.state = {
            interview: constructInterviewField()
        };
    }

    renderField =({field,form:{errors, touched},...props}: FieldProps) => {
        return (
            <div>
                <label htmlFor={field.name}> </label>
                <input
                    id={field.name}
                    {...field}
                    {...props}
                />
                {
                    touched[field.name] &&  <p>{errors[field.name]}</p>
                }
            </div>
        );
    };

    optionField =({field,form: {errors, touched},...props}: FieldProps) => {
        return (
            <div>
                <label htmlFor={field.name}></label>
                <select
                    id={field.name}
                    {...field}
                    {...props}
                >   <option> </option>
                    <option>Gregory</option>
                    <option>Peter</option>
                    <option>Taylor</option>
                    <option>Robert</option>
                </select>
                {
                    touched[field.name] &&  <p>{errors[field.name]}</p>
                }
            </div>
        )
    }



    render() {
        return (
            <div className = "form-group">
                <h2 className="d-flex justify-content-center">Post New Review</h2>
                <Formik
                    initialValues={{
                        id: 0,
                        candidate: '',
                        scheduler: '',
                        phone: '',
                        email: '',
                        comments: '',
                        time: date,
                        status:'',
                        resume:'',
                    }}
                    onSubmit={(values => {
                        addInterview(values)
                    })}
                    validationSchema={addInterviewSchema}
                >

                    <Form className="d-flex justify-content-center">
                        <div>
                            <span>Time : </span>
                            <Field
                                id='time'
                                name ='time'
                                type="datetime-local"
                                component={this.renderField}/>
                        </div>
                        <div>
                            <span>Candidate : </span>
                            <Field
                                id='candidate'
                                name ='candidate'
                                type='string'
                                component={this.renderField}/>
                        </div>
                        <div>
                            <span>Scheduler : </span>
                            <Field
                                id='scheduler'
                                name ='scheduler'
                                type='string'
                                component={this.optionField}/>
                        </div>
                        <div>
                            <span>Email : </span>
                            <Field
                                id='email'
                                name ='email'
                                type='string'
                                component={this.renderField}/>
                        </div>
                        <div>
                            <span>Phone : </span>
                            <Field
                                id='phone'
                                name ='phone'
                                type='string'
                                component={this.renderField}/>
                        </div>
                        <div>
                            <span>Comments : </span>
                            <Field
                                id='comments'
                                name ='comments'
                                type='string'
                                component={this.renderField}/>
                        </div>
                        <button className = "btn btn-success btn-sm">Add</button>
                        <button type="submit" className="btn btn-light">
                        <Link to={appConstants.interviewRoute}>Cancel</Link></button>
                    </Form>
                </Formik>

            </div>
        )
    }
}

export default connect(mapStateToProps, {addInterview})(AddInterview);

function mapStateToProps(redux: ReduxState) {
    const interview = redux.interview
    return {interview}
}

interface AddInterviewProps {
    interview: Interview
    addReview: (interview: Interview) => object
}

interface AddInterviewState {
    interview: Interview
}