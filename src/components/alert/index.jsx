import React from 'react'
import c from './alert.module.scss'
import { Icons } from '../../assets/icons'

const Alert = ({type, lateTime, time, setActive}) => {
  
  return (
    <div className={c.container} style={type === 'late' || type === "workplace"
      ? { background: '#FF8282' }
      : { background: '#98CA02' }
    }>
      <div className={c.alert}>
        {
          type === "win" ?
          <>
            <img src={Icons.cong} alt="" />
            <h2>Прибыли вовремя</h2>
            <p>Респект тебе!</p>
          </> : 
          type === "late" ?
          <>
            <p>Время прибытия</p>
            <h1>{time}</h1>
            <p>Вы опоздали на <span>{lateTime} минут!</span></p>
          </> : 
          type === 'workplace' ?
          <>
            <img src={Icons.heart_break} alt="" />
            <h2>ВЫ НЕ НА РАБОТЕ!</h2>
            <p>Попытка отметиться не находясь в маркете :(</p>
          </> : 
          type === 'leave' ?
          <>
            <img src={Icons.heart_break} alt="" />
            <h2>Хорошего пути!</h2>
            {/* <p>Попытка отметиться не находясь в маркете :(</p> */}
          </> :
          ''
        }
        <button onClick={() => setActive(false)}>
          Закрыть <img src={Icons.arrow} alt="" />
        </button>
      </div>
      
    </div>
  )
}

export default Alert