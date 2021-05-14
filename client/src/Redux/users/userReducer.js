import { ADD_USER, GET_USER, UPDATE_USER } from "./userType";

const initialState = [
  {
    fullName: "Dummy Contact",
    mobile: "9999999999",
    id: "395ed6ef-8975-49b6-b30a-290ab09f4a02",
  },
];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [action.payload, ...state];
    case GET_USER:
      const user = state.filter((u) => u.id === action.payload);
      return user;

    case UPDATE_USER:
      const users = state.filter((u) => u.id !== action.payload.id);
      return [action.payload, ...users]

    default:
      return state;
  }
};

export default userReducer;
