/* eslint-disable import/no-anonymous-default-export */
import http from "./http-common";

const getAll = () => {
  return http.get("/list");
};

const get = id => {
  return http.get(`/${id}`);
};

const add = data => {
  console.log("in add service", data)
  return http.post("/add", data);
};

const update = (id, data) => {
  // return http.put(`/update/${id}`, data);
  return http.patch(`/update/${id}`, data);
};

const remove = id => {
  return http.delete(`/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

export default {
  getAll,
  get,
  add,
  update,
  remove,
  removeAll
};
