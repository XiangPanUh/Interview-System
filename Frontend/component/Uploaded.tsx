import {SyntheticEvent} from "react";
import {appConstants} from "../shared/constants";
import {Link, RouteComponentProps} from "react-router-dom";

const Uploaded =(props: uploadedProps) => {

    const submitHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        props.history.push(appConstants.interviewRoute);
    }
    return (
        <form onSubmit={submitHandler}>
            <button type="submit" className="btn btn-dark">
                <Link to={appConstants.interviewRoute}>Upload Successfully
                </Link></button>
        </form>
    )
}
export default Uploaded;
interface uploadedProps extends RouteComponentProps {

}