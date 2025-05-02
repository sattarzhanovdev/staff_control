import React from 'react'
import c from './expenses.module.scss'
import { useNavigate } from 'react-router-dom'
import { API } from '../../api'

const Expenses = () => {
  const [ expenses, setExpenses ] = React.useState(null)
  const [ expensesList, setExpensesList ] = React.useState(null)
  const Navigate = useNavigate()

  React.useEffect(() => {
    API.getExpensesMore()
      .then(res => setExpenses(res.data))

    API.getExpenses()
      .then(res => setExpensesList(res.data))
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const formatted = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);

    return formatted;
  }
  return (
    <div className={c.expenses}>
      <div className={c.info}>
        <div>
          <p>Расходы за месяц</p>
          <h2>{expenses && expenses['за_месяц']} сом</h2>
        </div>
        <div>
          <p>Расходы за день</p>
          <h2>{expenses && expenses['за_день']}  сом</h2>
        </div>
        <div>
          <p>Расходы за неделю</p>
          <h2>{expenses && expenses['за_неделю']}  сом</h2>
        </div>
      </div>
      <button onClick={() => Navigate('/addExpense/')}>Добавить расход</button>

      <div className={c.expenses_list}>
        {
          expensesList && expensesList.map(item => (
            <div className={c.card}>
              <p><span>Название:</span> {item['название']}</p>
              <p><span>Категория:</span> {item['категория']}</p>
              <p><span>Дата:</span> {formatDate(item['дата'])}</p>
              <p><span>Сумма:</span> {item['сумма']} сом</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Expenses