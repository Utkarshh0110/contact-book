import React from "react";
import MessageList from "./MessageList";
import "./MessageCard.css";
import { connect } from "react-redux";
const MessageCard = (props) => {
  const noMessage = () => {
    return (
      <h2>
        <span>NO</span> ME<span>SSA</span>GES <span>S</span>ENT TI
        <span>LL</span> NOW
      </h2>
    );
  };

  return (
    <div
      className={
        props.messageList.length !== 0
          ? "messagecard__container"
          : "messagecard__container__listEmpty"
      }
    >
      {props.messageList.length === 0
        ? noMessage()
        : props.messageList.map((message) => {
            return (
              <MessageList
                key={message.messgId}
                fullName={message.fullName}
                receiverNumber={message.mobile}
                msgText={message.messageText}
              />
            );
          })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messageList: state.message,
  };
};

export default connect(mapStateToProps)(MessageCard);
