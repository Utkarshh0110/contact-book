import React from "react";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./components/User/User";
import Card from "./components/UserCard/Card";
import { Provider } from "react-redux";
import store from "./Redux/store";
import UpdateUser from "./components/Update/UpdateUser";
import Message from "./components/ComposeMessage/Message";
import MessageCard from "./components/showMessages/MessageCard";


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={User} />
          <Route exact path="/userinfo" component={Card} />
          <Route exact path="/edituser" component={UpdateUser} />
          <Route exact path="/composemessage" component={Message} />
          <Route exact path="/messagelist" component={MessageCard} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
