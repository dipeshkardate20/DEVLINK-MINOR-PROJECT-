import api from "./api";

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.put("/users/profile", payload);
  return data;
};

export const discoverUsers = async (params) => {
  const { data } = await api.get("/users/discover", { params });
  return data;
};

export const uploadProfileAsset = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/users/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
};
