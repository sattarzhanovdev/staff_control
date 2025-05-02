import React from 'react'
import c from './expenses.module.scss'

const Expenses = () => {
  return (
    <div className={c.expenses}>
      <div className={c.info}>
        <div>
          <p>Расходы за месяц</p>
          <h2>0 сом</h2>
        </div>
        <div>
          <p>Расходы за день</p>
          <h2>0 сом</h2>
        </div>
        <div>
          <p>Расходы за неделю</p>
          <h2>0 сом</h2>
        </div>
      </div>
      <button>Добавить расход</button>
    </div>
  )
}

export default Expenses