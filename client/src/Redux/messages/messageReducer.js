import { ADD_MESSAGE } from "./messageType";

const initialState = [];

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      state = [action.payload, ...state]
      return state;
    default:
      return state;
  }
};

export default messageReducer;
