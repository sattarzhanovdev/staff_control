import React, { use } from 'react'
import c from './details.module.scss'
import { Icons } from '../../assets/icons'

const ProfileDetails = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className={c.container}>
      <div className={c.details}>
        <div className={c.detail}>
          <p>Количество баллов:</p>
          <h2>
            {user["бонусы"]}
          </h2>
        </div>
        <div className={c.detail}>
          <p>Количество жизней: <span>{user["жизни"]}</span></p>
          <div className={c.hearts}>
            {
              Array.from({length: 5}).map(item => (
                <img src={Icons.heart} alt="" />
              ))
            }
          </div>
        </div>
        <div className={c.detail}>
          <p>Количество выполненных задач: <span>{user["выполненные_задачи"]}</span></p>
        </div>
        <div className={c.detail}>
          <p>Количество просроченных задач: <span>{user["просроченные_задачи"]}</span></p>
        </div>
        <div className={c.detail}>
          <p>Отработанные часы: <span>{user["отработанные_часы"]}</span></p>
        </div>
        <div className={c.detail}>
          <p>Заработная плата: <span>{user["зарплата"]}</span></p>
        </div>
        <div className={c.detail}>
          <p>Премия/бонус: <span>{user["премия"]}</span></p>
        </div>

      </div>
    </div>
  )
}

export default ProfileDetails