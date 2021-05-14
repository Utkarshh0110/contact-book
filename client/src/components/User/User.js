//This component can be used as an addUser as well as edit user.

import React, { useState } from "react";
import "./User.css";
import { connect } from "react-redux";
import { addUser } from "../../Redux";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const User = (props) => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    mobile: "",
  });
  const history = useHistory();

  const handleClick = () => {
    if (userInfo.fullName === "" || userInfo.mobile === "") {
      if (userInfo.fullName === "")
        toast.warn("ENTER YOUR NAME", { position: toast.POSITION.TOP_LEFT });
      else
        toast.warn("ENTER MOBILE NUMBER", {
          position: toast.POSITION.TOP_LEFT,
        });
    } else {
      const user = { ...userInfo, id: uuidv4() };
      if (
        user.mobile.length !== 10 ||
        user.mobile.toString().charAt(0) === "0"
      ) {
        toast.warn("ENTER A VALID NUMBER", {
          position: toast.POSITION.TOP_LEFT,
        });
        return;
      }
      props.addUser(user);
      setUserInfo({
        fullName: "",
        mobile: "",
      });
      history.push("/");
      toast.success("NEW CONTACT ADDED SUCCESSFULLY", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <div className="root__container">
      <div className="user__container">
        <div className="title">ADD CONTACT</div>
        <form>
          <div className="user__details">
            <div className="user__input-box">
              <span className="details">Full Name</span>
              <input
                onChange={(e) =>
                  setUserInfo({ ...userInfo, fullName: e.target.value })
                }
                maxLength="15"
                minLength="2"
                value={userInfo.fullName}
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="user__input-box">
              <span className="details">Mobile Number</span>
              <input
                onChange={(e) =>
                  setUserInfo({ ...userInfo, mobile: e.target.value })
                }
                maxLength="10"
                type="number"
                placeholder="Enter your mobile number"
                pattern="[1-9]{1}[0-9]{9}"
                value={userInfo.mobile}
                required={true}
              />
            </div>
          </div>
          <div onClick={handleClick} className="button">
            <input type="button" value="Add contact" />
          </div>
          <div onClick={() => history.push('/')} className="button">
            <input type="button" value="Back to home" />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(User);
// export default User;
