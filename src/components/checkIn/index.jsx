import React from 'react'
import c from './checkin.module.scss'
import { Icons } from '../../assets/icons'

const CheckIn = () => {
  return (
    <div className={c.checkIn}>
      <div className={c.header}>
        <h3>
          Саттаржанов Даниел
        </h3>
        <p>
          Программист
        </p>
      </div>
      <div className={c.check}>
        <h1>09:00</h1>
        <button>
          Отметиться <img src={Icons.arrow} alt="" />
        </button>
      </div>
    </div>
  )
}

export default CheckIn