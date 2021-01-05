import React from "react";
import { connect } from "react-redux";
import { signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            /*callback method, called when the load has finished*/
          window.gapi.client.init({
              clientId: '284994762592-ahih3ct9qvtq3vma3r803frccd9hqb5j.apps.googleusercontent.com',
              scope: 'email'
          }).then(() => {
              this.auth = window.gapi.auth2.getAuthInstance();
              this.onAuthChange(this.auth.isSignedIn.get());
              this.auth.isSignedIn.listen(this.onAuthChange);
          });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn === true) {
            return (
                <button className="ui red google button" onClick={this.onSignOut}>
                    <i className="google icon" />
                    Sign out
                </button>
            );
        } else {
            return (
                <button className="ui green google button" onClick={this.onSignIn}>
                    <i className="google icon" />
                    Sign in with Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);