import {ADD_MESSAGE} from './messageType'

export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        payload: message
    }
}