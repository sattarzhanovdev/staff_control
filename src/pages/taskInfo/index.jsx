import React, { useEffect, useState, useRef } from 'react'
import c from './task.module.scss'
import { Icons } from '../../assets/icons'
import { API } from '../../api'
import { useNavigate } from 'react-router-dom'

const TaskInfo = () => {
  const task = JSON.parse(localStorage.getItem('task'))
  const [executorName, setExecutorName] = useState('')
  const [setterName, setSetterName] = useState('')
  const [isStarted, setIsStarted] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const formatted = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    }).format(date)
    return formatted.replace(',', '')
  }

  const fetchUser = async (id, setFn) => {
    try {
      const res = await API.getUser(id)
      const user = res.data
      setFn(`${user['имя']} ${user['фамилия']}`)
    } catch (err) {
      console.error('Ошибка получения пользователя:', err)
      setFn('Неизвестно')
    }
  }

  useEffect(() => {
    if (task) {
      fetchUser(task['исполнитель'], setExecutorName)
      fetchUser(task['постановщик'], setSetterName)
    }
  }, [task])

  useEffect(() => {
    if (isStarted) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isStarted])

  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, '0')
    const seconds = String(secs % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  const handleButtonClick = async () => {
    if (!isStarted) {
      setIsStarted(true);
    } else {
      clearInterval(intervalRef.current);
      setIsStarted(false);
  
      const now = new Date();
      const deadline = new Date(task['срок']);

      const nowMs = now.getTime();
      const deadlineMs = deadline.getTime();

      const lateMinutes = nowMs > deadlineMs ? Math.floor((nowMs - deadlineMs) / 60000) : 0;
              
      const data = {
        статус: 'выполнена',
        потраченное_время_в_минутах: (seconds / 60).toFixed(2), // округли до 2 знаков
        опоздание_по_задаче_в_минутах: lateMinutes
      };
  
      try {
        await API.putTask(task.id, data);
        // alert(`✅ Задача завершена за ${formatTime(seconds)}. ${lateMinutes > 0 ? `Опоздание: ${lateMinutes} мин.` : 'В срок!'}`);
      } catch (err) {
        console.error('❌ Ошибка при обновлении задачи:', err.response?.data || err.message);
        alert('Ошибка при завершении задачи.');
      }
    }
  }

  const Navigate = useNavigate()

  return (
    <div className={c.container} style={isStarted ? {background: '#EFDF00'} : null}>
      <div className={c.task}>
        <div className={c.close} onClick={() => Navigate('/')}>
          <img src={Icons.close} alt="close" />
        </div>
        <div className={c.info}>
          <h3>{task['название']}</h3>
          <div className={c.details}>
            <p><b>Срок:</b> <span>{formatDate(task['срок'])}</span></p>
            <p><b>Приоритет:</b> <span>{task['приоритет']}</span></p>
            <p><b>Исполнитель:</b> <span>{executorName || 'Загрузка...'}</span></p>
            <p><b>Оценка задачи:</b> <span>{task['оценка']}</span></p>
            <p><b>Постановщик:</b> <span>{setterName || 'Загрузка...'}</span></p>
          </div>
        </div>

        <div className={c.timer}>
          <h1>{formatTime(seconds)}</h1>
          <button onClick={handleButtonClick} style={isStarted ? {background: 'red'} : null}>
            {isStarted ? 'Сделано' : 'Приступаю'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskInfo