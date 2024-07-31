
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
} from '../actions/userActions';

const initialState = {
    users: [],
    loading: false,
    error: null
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: [...state.users, ...action.payload] };
        case FETCH_USERS_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};
