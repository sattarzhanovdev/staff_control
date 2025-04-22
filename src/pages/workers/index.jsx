import React from 'react'
import c from './workers.module.scss'
import { API } from '../../api'
import { useNavigate } from 'react-router-dom'

const Workers = () => {
  const [ workers, setWorkers ] = React.useState([])

  React.useEffect(() => {
    API.getWorkers()
      .then(res => {
        setWorkers(res.data)
      })
  }, [])

  const deleteWorker = (id) => {
    API.deleteWorker()
  }

  const Navigate = useNavigate()

  return (
    <div className={c.container}>
      <div className={c.workers}>
        <h2>Работники</h2>
        <button onClick={() => Navigate('/addWorker/')}>Добавить работника</button>
        <div className={c.list}>
          {
            workers && workers.map(item => (
              <div className={c.worker}>
                <h3>{item["имя"]} {item["фамилия"]}</h3>
                <p>График работы: <span>{item["график_работы"]}</span></p>
                <p>Должность: <span>{item["должность"]}</span></p>
                <p>Зарплата: <span>{item["зарплата"]} сом</span></p>
                <p>Жизни: <span>{item["жизни"]}</span></p>
                <p>Отработанные часы: <span>{item["отработанные_часы"]}</span></p>
                <button>Уволить</button>
              </div>
            ))
        }
        </div>
      </div>
    </div>
  )
}

export default Workers