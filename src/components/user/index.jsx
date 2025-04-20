import React from 'react'
import c from './user.module.scss'
import { Icons } from '../../assets/icons'

const User = () => {
  return (
    <div className={c.container}>
      <div className={c.user}>
        <div className={c.photo}>
          <img src={Icons.photo} alt="" />
        </div>
        <div className={c.info}>
          <h2>Саттаржанов Даниел</h2>
          <p>Программист</p>
        </div>
      </div>
    </div>
  )
}

export default User