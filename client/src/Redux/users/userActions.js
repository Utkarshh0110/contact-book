import {ADD_USER, GET_USER, UPDATE_USER} from './userType'

export const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}


export const getUser = (id) => {
    return {
        type: GET_USER,
        payload: id
    }
}

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user
    }
}