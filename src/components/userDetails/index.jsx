import React from 'react'
import c from './details.module.scss'
import { Icons } from '../../assets/icons'

const ProfileDetails = () => {
  return (
    <div className={c.container}>
      <div className={c.details}>
        <div className={c.detail}>
          <p>Количество баллов:</p>
          <h2>
            25
          </h2>
        </div>
        <div className={c.detail}>
          <p>Количество жизней: <span>3</span></p>
          <div className={c.hearts}>
            <img src={Icons.heart} alt="" />
            <img src={Icons.heart} alt="" />
            <img src={Icons.heart} alt="" />
            <img src={Icons.heart_break} alt="" />
            <img src={Icons.heart_break} alt="" />
          </div>
        </div>
        <div className={c.detail}>
          <p>Количество выполненных задач: <span>2</span></p>
        </div>
        <div className={c.detail}>
          <p>Количество просроченных задач: <span>2</span></p>
        </div>
        <div className={c.detail}>
          <p>Отработанные часы: <span>2</span></p>
        </div>
        <div className={c.detail}>
          <p>Заработная плата:<span>2</span></p>
        </div>
        <div className={c.detail}>
          <p>Премия/бонус: <span>2</span></p>
        </div>

      </div>
    </div>
  )
}

export default ProfileDetails