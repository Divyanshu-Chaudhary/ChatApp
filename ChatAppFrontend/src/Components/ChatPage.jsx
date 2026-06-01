/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "react";
import { MdSend, MdAttachFile } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useChatContext } from "../Context/ChatContext";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { baseURL } from "../Route/Axioshelper";
import { toast } from "react-hot-toast";
import { getMessages } from "../Services/RoomService";
import { timeAgo } from "../Route/Helper";

const ChatPage = () => {
  const { roomId, userName, connected, setConnected, setUserName, setRoomId } =
    useChatContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, userName]);
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await getMessages(roomId);
        setMessage(response);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }
    if (connected) {
      loadMessages();
    }
  }, []);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [message]);
  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [message]);
  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(socket);
      client.connect({}, () => {
        setStompClient(client);
        setConnected(true);
        toast.success("Connected");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessage((prevMessages) => [...prevMessages, receivedMessage]);
        });
      });
    };
    if (connected) {
      connectWebSocket();
    }
  }, [roomId]);

  const handleLeaveRoom = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        setStompClient(null);
        setConnected(false);
        setUserName("");
        setRoomId("");
        toast.success("Room Left");
      });
    }
    navigate("/");
  };

  const sendMessage = async () => {
    if (stompClient && connected && input.trim() !== "") {
      const newMessage = {
        sender: userName,
        content: input,
        roomId: roomId,
      };
      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(newMessage),
      );
      setInput("");
    }
  };

  return (
    <div className="">
      <header className="border dark:border-gray-700 py-5 fixed w-full h-20 flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-900">
        <div className="text-xl font semibold">
          <h1>
            Room : <span>{roomId}</span>{" "}
          </h1>
        </div>
        <div className="text-2xl font semibold">
          <h1>
            User : <span>{userName}</span>{" "}
          </h1>
        </div>
        <div>
          <button
            onClick={handleLeaveRoom}
            className="dark:bg-red-500 dark:hover:bg-red-700  py-2 px-4 rounded-full"
          >
            Leave Room
          </button>
        </div>
      </header>

      <main
        ref={chatBoxRef}
        className="pt-24 h-screen mx-auto overflow-auto w-2/3 dark:bg-slate-500"
      >
        {message.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === userName ? "justify-end" : "justify-start"}`}
          >
            <div className="flex flex-row items-center gap-2 my-2 max-w-xs px-2">
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU3BgLYS_VDNdQqhEDiDrx5LkZETFxpNc15Q&s"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full bg-gray-200"
              />
              <div
                className={` bg-gray-200 ${msg.sender === userName ? "dark:bg-gray-700" : "dark:bg-blue-600"} p-4 rounded-lg`}
              >
                <p
                  className={`text-sm font-semibold mb-1 ${msg.sender === userName ? "text-green-500" : "text-pink-300"}`}
                >
                  {msg.sender}
                </p>
                <p>{msg.content}</p>
                <p className="text-xs text-gray-500">
                  {timeAgo(msg.timeStamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>

      <div className="fixed bottom-0 w-full h-18 p-4">
        <div className="h-full w-1/2 mx-auto flex items-center justify-between gap-5 rounded-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type your message here..."
            className="h-full w-full px-4 py-2 dark:bg-gray-700 border dark:border-gray-900 rounded-full focus:outline-none"
          ></input>
          <div className="flex items-center gap-2">
            <button className="dark:bg-gray-700 dark:hover:bg-gray-800 h-10 w-10 rounded-full flex items-center justify-center">
              <MdAttachFile />
            </button>
            <button
              onClick={sendMessage}
              className="dark:bg-blue-500 dark:hover:bg-blue-700 h-10 w-10 rounded-full flex items-center justify-center"
            >
              <MdSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
