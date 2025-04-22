import axios from "axios";

const token = localStorage.getItem('token')
export const API = {
  login: (data) => axios.post('/login/', data),
  getUserInfo: (token) => axios.get('/me/', {
    headers: {
      Authorization: `token ${token}`
    }
  }),
  getWorkers: () => axios.get(`/работники/`, {
    headers: {
      Authorization: `token ${token}`
    }
  }),
  getUser: (id) => axios.get(`/работники/${id}/`, {
    headers: {
      Authorization: `token ${token}`
    }
  }),
  getTasks: (token) => axios.get('/задачи/', {
    headers: {
      Authorization: `token ${token}`
    }
  }),
  getTask: (id) => axios.get(`/задачи/${id}/`),
  postTask: (data) => axios.post(`/задачи/`, data, {
    headers: {
      Authorization: `token ${token}`
    }
  }),
  postAttendance: (token, data) => axios.post('/посещения/', data, {
    headers: {
      Authorization: `token ${token}`
    }
  }),
  putAttendance: (id, data) => axios.patch(`/посещения/${id}/`, data, {
    headers: {
      Authorization: `Token ${token}`
    }
  }),
  putTask: (id, data) => axios.patch(`/задачи/${id}/`, data, {
    headers: {
      Authorization: `Token ${token}`
    }
  }), 
  getAttendance: () => axios.get('/посещения/', {
    headers: {
      Authorization: `token ${token}`
    }
  }),
}