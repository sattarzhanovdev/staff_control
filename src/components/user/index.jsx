import React from 'react'
import c from './user.module.scss'
import { Icons } from '../../assets/icons'

const User = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className={c.container}>
      <div className={c.user}>
        <div className={c.photo}>
          <img src={Icons.photo} alt="" />
        </div>
        <div className={c.info}>
          <h2>{`${user["имя"]} ${user["фамилия"]}`}</h2>
          <p>{user["должность"]}</p>
        </div>
      </div>
    </div>
  )
}

export default User