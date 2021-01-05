import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(formValues, this.props.match.params.id);
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading..</div>;
        }

        return (
            <div>
                <h3>Stream Edit</h3>
                <StreamForm
                    onSubmit={this.onSubmit}
                    initialValues={_.pick(this.props.stream, "title", "description")}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownedProps) => {
    return { stream: state.streams[ownedProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);