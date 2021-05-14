import React from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { OTP_URL } from "../../api";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Home = (props) => {
  const history = useHistory();
  const handleClick = () => history.push("/add");
  const showUserDetails = (id) =>
    history.push({
      pathname: "/userinfo",
      state: { id },
    });

  const sendOtp = async (user) => {
    await axios
      .post(OTP_URL, user)
      .then((response) => {
        toast.success(response.data[0], { position: toast.POSITION.TOP_LEFT });
      })
      .catch((err) => {
        toast.warn("Could not send message", {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  return (
    <div className="home__container">
      <div className="home__container__details">
        <h1>
          <i>WELCOME TO CONTACTS APP</i>
        </h1>
        <button onClick={handleClick} className="home__button">
          <i>ADD A NEW CONTACT</i>
        </button>
        <button
          onClick={() => history.push("/messagelist")}
          className="home__button1"
        >
          <i>SWITCH TO SENT MESSAGE LIST</i>
        </button>
      </div>
      <ul>
        {props.usersList.map((user) => {
          return (
            <li key={user.id}>
              <span className="full__Name">{user.fullName}</span>
              <button onClick={() => sendOtp(user)} className="show__details">
                <i>SEND OTP</i>
              </button>
              <button
                onClick={() => showUserDetails(user.id)}
                className="show__details"
              >
                <i>SHOW DETAILS</i>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    usersList: state.user,
  };
};

export default React.memo(connect(mapStateToProps, null)(Home));
