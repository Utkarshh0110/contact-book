import "./Message.css";
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { addMessage } from "../../Redux";
import { MESSAGE_URL } from "../../api";

toast.configure();
const Message = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    mobile: "",
    id: "",
    messageText: "",
  });

  const backHome = () => {
    history.push("/");
  };

  const setUserStatus = () => {
    if (location.state === undefined) {
      history.push("/");
      toast.warn("SELECT A USER TO VIEW DETAILS", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    setUserInfo({ ...location.state, messgId: uuidv4() });
  };

  useEffect(() => {
    setUserStatus();
  }, []);

  const sendMessage = async () => {
    if (userInfo.mobile === "" || userInfo.messageText === "") {
      toast.warn("ENTER COMPLETE DETAILS", {
        position: toast.POSITION.TOP_LEFT,
      });

      return;
    }
    await axios
      .post(MESSAGE_URL, userInfo)
      .then((response) => {
        toast.success(response.data[0], {
          position: toast.POSITION.TOP_LEFT,
        });
        history.push("/");
        props.addMessage(userInfo);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="message__root__container">
      <div className="message__user__container">
        <div className="message__title">
          <i>Hi, compose {userInfo.fullName} message </i>
        </div>
        <form>
          <div className="message__user__details">
            <div className="message__user__input-box">
              <span className="message__details">
                <i>RECEIVER MOBILE NUMBER</i>
              </span>
              <input
                disabled
                value={userInfo.mobile}
                onChange={(e) => console.log(e)}
                required
              />
            </div>
            <div className="message__user__input-box">
              <span className="message__details">
                <i>MESSAGE</i>
              </span>
              <input
                onChange={(e) =>
                  setUserInfo({ ...userInfo, messageText: e.target.value })
                }
                placeholder="ENTER MESSAGE..."
                type="text"
                required
              />
            </div>
          </div>
          <div onClick={sendMessage} className="message__button">
            <input type="button" value="SEND MESSAGE" />
          </div>
          <div onClick={backHome} className="message__button">
            <input type="button" value="BACK TO HOME" />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (user) => dispatch(addMessage(user)),
  };
};

export default connect(null, mapDispatchToProps)(Message);
