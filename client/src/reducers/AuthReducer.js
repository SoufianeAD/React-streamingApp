import { SIGN_IN, SIGN_OUT} from "../actions/Types";

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
} /*used when the value of state is undefined at the first time*/

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
}