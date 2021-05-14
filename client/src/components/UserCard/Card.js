import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getUser } from "../../Redux";

import { connect } from "react-redux";
import './Card.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from '../../assets/image.png'

toast.configure();
const Card = (props) => {

  const history = useHistory();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});

  const setUserState = () => {
    if(location.state === undefined){
        history.push('/')
        toast.warn("SELECT A USER TO VIEW DETAILS", { position: toast.POSITION.TOP_LEFT });
        return;
    }
    const user = props.usersList.filter((obj) => obj.id === location.state.id)
    setUserInfo(user[0]);
  }

  const handleClick = (id) => {
    history.push({
      pathname:'/edituser',
      state:{id}
    })
  }

  const handleComposeMessage = (user) => {
    history.push({
      pathname:'/composemessage',
      state:user
    })
  }


  useEffect(() => {
    setUserState();
  });
  
  return (
    <div className="card">
      <h1>{userInfo.fullName}</h1>
      <img src={image} alt="John"  />
      <p className="title">CEO & Founder, Example</p>
      <p className="title">Number - {userInfo.mobile}</p>
      <p>Harvard University</p>
      <a href="/#">
        <i className="fa fa-dribbble"></i>
      </a>
      <a href="/#">
        <i className="fa fa-twitter"></i>
      </a>
      <a href="https://www.linkedin.com/in/utkarshtiwari996/">
        <i className="fa fa-linkedin"></i>
      </a>
      <a href="/#">
        <i className="fa fa-facebook"></i>
      </a>
      <p>
        <button onClick={() => handleClick(userInfo.id)} className="card__button">Edit Contact</button>
      </p>
      <p>
        <button onClick={() => handleComposeMessage(userInfo)} className="card__button">Compose message</button>
      </p>
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
    getUser: (id) => dispatch(getUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
