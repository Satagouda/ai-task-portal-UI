import api from "./axios";

export const getLedger = async (
  taskId
) => {

  const response =
    await api.get(
      `/ledger/${taskId}`
    );

  return response.data.data;
};

export const verifyLedger =
  async (taskId) => {

    const response =
      await api.get(
        `/ledger/verify/${taskId}`
      );

    return response.data.data;
};