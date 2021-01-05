import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";


class StreamDelete extends React.Component {

    componentDidMount() {
       this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment> {/*can be written on short format <></>*/}
                <button
                    onClick={() => this.props.deleteStream(id)}
                    className="ui button negative"
                >
                    Delete
                </button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if(!this.props.stream) {
            return "Are sure you want to delete this Stream?";
        }

        return `Are sure you want to delete stream with title : ${this.props.stream.title}`;
    }

    render() {
        return (
            <div>
                StreamDelete
                <Modal
                    title="Stream Delete"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </div>
        );
    }
}

const mapStateToProp = (state, ownedProps) => {
    return { stream: state.streams[ownedProps.match.params.id] };
}

export default connect(mapStateToProp, { fetchStream, deleteStream })(StreamDelete);