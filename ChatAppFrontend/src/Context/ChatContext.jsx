/* eslint-disable no-unused-vars */
import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [connected, setConnected] = useState(false);
  return (
    <ChatContext.Provider
      value={{
        roomId,
        setRoomId,
        userName,
        setUserName,
        connected,
        setConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
