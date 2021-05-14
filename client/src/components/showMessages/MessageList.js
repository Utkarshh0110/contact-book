import React from "react";
import './MessageList.css'
const MessageList = ({fullName, receiverNumber, msgText}) => {
  return (
    <div className="messageList__card">
      <h3> <i>Receiver - {receiverNumber}</i></h3>
      <div className="messageList__container">
        <h4>
          <b><i>{msgText}</i></b>
        </h4>
      </div>
    </div>
  );
};

export default MessageList;
