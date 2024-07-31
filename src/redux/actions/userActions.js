
import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsers = (limit, skip, sortField, sortOrder) => async dispatch => {
    dispatch({ type: FETCH_USERS_REQUEST });

    try {
        const params = {
            limit,
            skip,
            sort: sortField ? `${sortField},${sortOrder}` : undefined
        };

        const { data } = await axios.get('https://dummyjson.com/users', { params });
        dispatch({ type: FETCH_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, error });
    }
};

