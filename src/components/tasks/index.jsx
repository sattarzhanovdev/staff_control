import React from 'react'
import c from './tasks.module.scss'
import { Link } from 'react-router-dom'
import { Icons } from '../../assets/icons'
import { API } from '../../api'
import UserName from '../username'

const Tasks = () => {
  const [ tasks, setTasks ] = React.useState(null)

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  React.useEffect(() => {
    API.getTasks(token)
      .then(res => {
        if(user['должность'] !== 'Администратор') {
          const result = res.data.filter(item => item["исполнитель"] === user["id"] && item["статус"] !== 'Выполнена')
          setTasks(result.reverse())
        }else{
          setTasks(res.data.reverse())
        }
      })
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const formatted = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    }).format(date);

    return formatted;
  }

  return (
    <div className={c.container}>
      <div className={c.tasks}>
        <h3>
          Задачи на сегодня
        </h3>
        <div className={c.tasksList}>
          {
            tasks && tasks.map(item => {
              const isOverdue = new Date(item["срок"]) < new Date();

              return (
                <div className={c.task} id={isOverdue ? c.overdue : ''}>
                  <h3>
                    {item["название"]}
                  </h3>
                  <div className={c.info}>
                    <p>
                      <span>Срок:</span> {formatDate(item["срок"])}
                    </p>
                    {
                      user['должность'] === 'Администратор' && (<p>
                        <span>Исполнитель:</span> <UserName id={item["исполнитель"]} />
                      </p>)
                    }
                    <p>
                      <span>Приоритет:</span> {item["приоритет"].slice(0, 1).toUpperCase() + item["приоритет"].slice(1)}
                    </p>
                  </div>

                  <Link to="/task/" onClick={() => localStorage.setItem('task', JSON.stringify(item))}>
                    Подробнее <img src={Icons.arrow_black} alt="" />
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Tasks