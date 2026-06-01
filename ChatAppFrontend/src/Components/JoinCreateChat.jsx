/* eslint-disable no-unused-vars */
import "react";
import chatImage from "../assets/speech-bubble.png";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { createRoom, joinRoom } from "../Services/RoomService";
import { useChatContext } from "../Context/ChatContext";
import { useNavigate } from "react-router-dom";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    name: "",
    roomId: "",
  });
  const { roomId, userName, setRoomId, setUserName, connected, setConnected } =
    useChatContext();
  const navigate = useNavigate();
  function handleChange(e) {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  }
  function toValidate() {
    if (detail.name.trim() === "" || detail.roomId.trim() === "") {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  }
  async function joinChat() {
    if (!toValidate()) return;
    // Logic to join the room
    try {
      const response = await joinRoom(detail.roomId);
      toast.success("Joined room successfully.");
      setUserName(detail.name);
      setRoomId(detail.roomId);
      setConnected(true);
      navigate("/chat");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        toast.error("Room not found. Please check the Room ID.");
      }
      toast.error("Failed to join room. Please try again.");
    }
  }
  async function createChat() {
    if (!toValidate()) return;
    // Logic to create a new room
    try {
      const response = await createRoom(detail.roomId);
      toast.success("Room created successfully.");
      setUserName(detail.name);
      setRoomId(detail.roomId);
      setConnected(true);
      navigate("/chat");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        toast.error("Room already exists. Please choose a different Room ID.");
      }
      toast.error("Failed to create room. Please try again.");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 rounded dark:border-gray-700 border shadow-md w-full max-w-md dark:bg-gray-900 flex flex-col gap-5">
        <div>
          <img src={chatImage} alt="Chat" className="w-24 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-center">
          Join Room / Create Room
        </h1>
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Your Name
          </label>
          <input
            onChange={handleChange}
            value={detail.name}
            name="name"
            placeholder="Enter your name"
            type="text"
            id="name"
            className="w-full px-4 py-2 dark:bg-gray-600 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></input>
        </div>
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Room ID/ New Room ID
          </label>
          <input
            name="roomId"
            onChange={handleChange}
            value={detail.roomId}
            placeholder="Enter Room ID or New Room ID"
            type="text"
            id="name"
            className="w-full px-4 py-2 dark:bg-gray-600 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></input>
        </div>
        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={joinChat}
            className="px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
          >
            Join Room
          </button>
          <button
            onClick={createChat}
            className="px-3 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-200"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
