
import { combineReducers } from "redux";
import messageReducer from "./messages/messageReducer";
import userReducer from "./users/userReducer";

const rootReducer = combineReducers({
  message: messageReducer,
  user: userReducer,
});

export default rootReducer;