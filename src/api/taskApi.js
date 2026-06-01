import api from "./axios";

export const getTasks = async (
  page = 0,
  size = 10
) => {
  const response = await api.get(
    `/tasks?page=${page}&size=${size}`
  );

  return response.data.data;
};

export const createTask = async (
  task
) => {
  const response = await api.post(
    "/tasks",
    task
  );

  return response.data;
};

export const updateTask = async (
  id,
  task
) => {
  const response = await api.put(
    `/tasks/${id}`,
    task
  );

  return response.data;
};

export const deleteTask = async (
  id
) => {
  const response = await api.delete(
    `/tasks/${id}`
  );

  return response.data;
};

export const searchTasks = async ({
  keyword,
  status,
  priority,
  page = 0,
  size = 10,
}) => {

  const params =
    new URLSearchParams();

  if (keyword)
    params.append(
      "keyword",
      keyword
    );

  if (status)
    params.append(
      "status",
      status
    );

  if (priority)
    params.append(
      "priority",
      priority
    );

  params.append("page", page);
  params.append("size", size);

  const response =
    await api.get(
      `/tasks/search?${params}`
    );

  return response.data.data;
};

export const getTaskById = async (id) => {

  const response = await api.get(
    `/tasks/${id}`
  );

  return response.data.data;
};