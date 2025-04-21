import axios from "axios";

const token = localStorage.getItem('token')
export const API = {
  login: (data) => axios.post('/login/', data),
  getUserInfo: (token) => axios.get('/me/', {
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
  postAttendance: (token, data) => axios.post('/посещения/', data, {
    headers: {
      Authorization: `token ${token}`
    }
  }),
  putTask: (id, data) => axios.patch(`/задачи/${id}/`, data, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}