import { AxiosInstance } from "../Route/Axioshelper";

export const createRoom = async (roomData) => {
  const response = await AxiosInstance.post("/api/v1/rooms", roomData, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};

export const joinRoom = async (roomId) => {
  const response = await AxiosInstance.get(
    `/api/v1/rooms/${roomId}`,
    {},
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
  return response.data;
};

export const getMessages = async (roomId, size = 50, page = 0) => {
  const response = await AxiosInstance.get(
    `/api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
  return response.data;
};
