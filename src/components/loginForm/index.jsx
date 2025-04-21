import React from 'react'
import c from './form.module.scss'
import { useForm } from 'react-hook-form'
import { API } from '../../api'

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
              window.location.href = '/'
            })
        } else {
          alert('Неверный логин или пароль')
        }
      }
    )
  }
  return (
    <div className={c.container}>
      <form className={c.form} onSubmit={handleSubmit((data) => login(data))}>
        <h2>Вход</h2>
        <div className={c.inputGroup}>
          <label htmlFor="username">Логин</label>
          <input type="text" id="username" placeholder="Введите логин" {...register('username')} />
        </div>
        <div className={c.inputGroup}>
          <label htmlFor="password">Пароль</label>
          <input type="password" id="password" placeholder="Введите пароль" {...register('password')}/>
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

export default LoginForm