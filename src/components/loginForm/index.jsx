import React from 'react'
import c from './form.module.scss'
import { useForm } from 'react-hook-form'
import { API } from '../../api'
import axios from 'axios'

const LoginForm = () => {
  const { handleSubmit, register, reset } = useForm()

  const login = (data) => {
    API.login(data)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token)
          API.getUserInfo(res.data.token)
            .then(user => {
              localStorage.setItem('user', JSON.stringify(user.data))
              if(user.data['должность'] === 'Администратор') {
                axios.post('/login/', {
                  username: 'admin',
                  password: 'admin123'
                }).then(res => {
                  localStorage.setItem('adminToken', res.data.token)
                  window.location.href = '/'
                })
              } else {
                window.location.href = '/'
              }
            })
        } else {
          alert('Неверный логин или пароль')
        }
      })
  }

  return (
    <div className={c.container}>
      <div className={c.card}>
        <form className={c.form} onSubmit={handleSubmit(login)}>
          <h2>Вход</h2>
          <div className={c.inputGroup}>
            <label htmlFor="username">Логин</label>
            <input
              type="text"
              id="username"
              placeholder="Введите логин"
              {...register('username')}
              required
            />
          </div>
          <div className={c.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              {...register('password')}
              required
            />
          </div>
          <button type="submit" className={c.btn}>Войти</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm