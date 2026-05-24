import api from "./api";

export const getProjects = async (params) => {
  const { data } = await api.get("/projects/all", { params });
  return data;
};

export const createProject = async (payload) => {
  const { data } = await api.post("/projects/create", payload);
  return data;
};

export const joinProject = async (id) => {
  const { data } = await api.post(`/projects/${id}/join`);
  return data;
};
