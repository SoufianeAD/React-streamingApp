import { CREATE_STREAM,
    SIGN_IN,
    SIGN_OUT, DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS } from "./Types";
import Streams from "../apis/Streams";
import history from "../history"

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = (formValues) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await Streams.post('/streams', { ...formValues, userId });
    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
}

export const fetchStreams = () => async (dispatch) => {
    const response = await Streams.get('/streams');
    dispatch({ type: FETCH_STREAMS, payload: response.data });
}

export const fetchStream = (id) => async (dispatch) => {
    const response = await Streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const deleteStream = (id) => async (dispatch) => {
    await Streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
}

export const editStream = (formValues, id) => async (dispatch) => {
    const response = await Streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
}