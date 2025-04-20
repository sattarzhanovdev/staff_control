import React from 'react'
import c from './tasks.module.scss'
import { Link } from 'react-router-dom'
import { Icons } from '../../assets/icons'

const Tasks = () => {
  return (
    <div className={c.container}>
      <div className={c.tasks}>
        <h3>
          Задачи на сегодня
        </h3>
        <div className={c.tasksList}>
          <div className={c.task}>
            <h3>
              Задача 1
            </h3>
            <div className={c.info}>
              <p>
                <span>Срок:</span> 12:00
              </p>
              <p>
                <span>Приоритет:</span> Срочно
              </p>
            </div>

            <Link to="/tasks/1">
              Подробнее <img src={Icons.arrow_black} alt="" />
            </Link>
          </div>
          <div className={c.task}>
            <h3>
              Задача 1
            </h3>
            <div className={c.info}>
              <p>
                <span>Срок:</span> 12:00
              </p>
              <p>
                <span>Приоритет:</span> Срочно
              </p>
            </div>

            <Link to="/tasks/1">
              Подробнее <img src={Icons.arrow_black} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks