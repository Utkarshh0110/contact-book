import React, { useState, useEffect } from "react";
import "./UpdateUser.css";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../Redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const UpdateUser = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    mobile: "",
    id: "",
  });

  const handleClick = () => {
    if (userInfo.fullName === "" || userInfo.mobile === "") {
      if (userInfo.fullName === "")
        toast.warn("ENTER YOUR NAME", { position: toast.POSITION.TOP_LEFT });
      else
        toast.warn("ENTER MOBILE NUMBER", {
          position: toast.POSITION.TOP_LEFT,
        });
    } else {
      if (
        userInfo.mobile.length !== 10 ||
        userInfo.mobile.toString().charAt(0) === "0"
      ) {
        toast.warn("ENTER A VALID NUMBER", {
          position: toast.POSITION.TOP_LEFT,
        });
        return;
      }
      props.updateUser(userInfo);
      setUserInfo({
        fullName: "",
        mobile: "",
        id: "",
      });

      window.history.replaceState({}, document.title);
      history.push("/");
      toast.success("CONTACT UPDATED SUCCESSFULLY", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const setUserState = () => {
    if (location.state === undefined) {
      history.push("/");
      toast.warn("SELECT A USER TO VIEW DETAILS", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    const user = props.usersList.filter((obj) => obj.id === location.state.id);
    setUserInfo(user[0]);
  };

  useEffect(() => {
    setUserState();
  }, [userInfo !== undefined]);

  return (
    <div className="root__container">
      <div className="user__container">
        <div className="title">
          <i> EDIT CONTACT </i>
        </div>
        <form>
          <div className="user__details">
            <div className="user__input-box">
              <span className="details">Full Name</span>
              <input
                placeholder="Enter your full name"
                maxLength="15"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, fullName: e.target.value })
                }
                value={userInfo.fullName}
                required
              />
            </div>
            <div className="user__input-box">
              <span className="details">Mobile Number</span>
              <input
                value={userInfo.mobile}
                type="number"
                maxLength="10"
                placeholder="Enter your mobile number"
                pattern="[1-9]{1}[0-9]{9}"
                required={true}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, mobile: e.target.value })
                }
              />
            </div>
          </div>
          <div onClick={handleClick} className="button__update">
            <input type="button" value="Update contact" />
          </div>
          <div onClick={() => history.push('/')} className="button__update">
            <input type="button" value="Back to home" />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    usersList: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
