import api from "./axios";

export const generateTaskDetails = async (
  title
) => {

  const response =
    await api.post(
      "/ai/generate",
      {
        title
      }
    );

  return response.data.data;
};