import React from 'react'
import c from './workers.module.scss'
import { API } from '../../api'
import { useNavigate } from 'react-router-dom'

const Workers = () => {
  const [ workers, setWorkers ] = React.useState([])
  const [ expensesList, setExpensesList ] = React.useState(null)

  React.useEffect(() => {
    API.getWorkers()
      .then(res => {
        setWorkers(res.data)
      })

    API.getExpenses()
      .then(res => setExpensesList(res.data.reverse()))
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
  
  const findExpense = (worker) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // последний день месяца
    
    const total = expensesList
      .filter(item => {
        const itemDate = new Date(item['дата']);
        return (
          item['исполнитель'] === worker &&
          itemDate >= startOfMonth &&
          itemDate <= endOfMonth
        );
      })
      .reduce((sum, item) => sum + Number(item['сумма']), 0);  
    
    return total
  }

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
                <p>Итог: <span>{(Number(item["зарплата"]) + (Number(item["отработанные_часы"]) > 286 ? (Number(item["отработанные_часы"])-286) * (Number(item['зарплата'])/26/11).toFixed(0, 2): 0)) - findExpense(`${item["имя"]} ${item["фамилия"]}`)} сом</span></p>
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