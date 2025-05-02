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
    const asking = window.confirm('Вы уверены?')
    if(asking){
      API.deleteWorker(id)
        .then(_ => {
          alert('Работник уволен!')
          window.location.reload()
        })
    }
  }

  const Navigate = useNavigate()
  console.log(workers);
  

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
                <p>Бонус: <span>{Number(item["отработанные_часы"]) > 286 ? (Number(item["отработанные_часы"])-286) * (Number(item['зарплата'])/26/11).toFixed(0, 2): 0} сом</span></p>
                {/* <p>Зарплата: <span>{Number(item["зарплата"]) + Math.floor(((item.зарплата / 26) / 11) * Number(item["отработанные_часы"]))} сом</span></p> */}
                <p>Тип получения зарплаты: <span>{item["тип_получения_зарплаты"]}</span></p>
                <p>Жизни: <span>{item["жизни"]}</span></p>
                <p>Отработанные часы: <span>{Number(item["отработанные_часы"]).toFixed(2)} часов</span></p>
                <button onClick={() => deleteWorker(item.id)}>Уволить</button>
              </div>
            ))
        }
        </div>
      </div>
    </div>
  )
}

export default Workers