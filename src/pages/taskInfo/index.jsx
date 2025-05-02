import React, { useEffect, useState, useRef } from 'react'
import c from './task.module.scss'
import { Icons } from '../../assets/icons'
import { API } from '../../api'
import { useNavigate } from 'react-router-dom'
import { IMaskInput } from 'react-imask'

const TaskInfo = () => {
  const task = JSON.parse(localStorage.getItem('task'))
  const [executorName, setExecutorName] = useState('')
  const [setterName, setSetterName] = useState('')
  const [isStarted, setIsStarted] = useState('в_ожидании')
  const [startTime, setStartTime] = useState(null)
  const [seconds, setSeconds] = useState(0)
  const [formData, setFormData] = useState({
    дата: task?.срок ? new Date(task.срок).toLocaleDateString('ru-RU') : '',
    время: task?.срок ? new Date(task.срок).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : ''
  })
  const intervalRef = useRef(null)
  const Navigate = useNavigate()

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
    if (isStarted === 'в_процессе') {
      const savedStart = localStorage.getItem('task_start_time')
      const base = savedStart ? parseInt(savedStart) : Date.now()
      setStartTime(base)
      localStorage.setItem('task_start_time', base)

      intervalRef.current = setInterval(() => {
        const now = Date.now()
        setSeconds(Math.floor((now - base) / 1000))
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isStarted])

  useEffect(() => {
    const savedStart = localStorage.getItem('task_start_time')
    if (savedStart && isStarted === 'в_процессе') {
      const now = Date.now()
      setSeconds(Math.floor((now - parseInt(savedStart)) / 1000))
      setStartTime(parseInt(savedStart))
    }
  }, [])

  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, '0')
    const seconds = String(secs % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  const handleButtonClick = async () => {
    if (isStarted === 'в_ожидании') {
      setIsStarted('в_процессе')
      const data = {
        статус: 'в_процессе',
        потраченное_время_в_минутах: 0,
        опоздание_по_задаче_в_минутах: 0
      }
      await API.putTask(task.id, data)
    } else {
      clearInterval(intervalRef.current)
      setIsStarted('выполнена')
      localStorage.removeItem('task_start_time')

      const now = new Date()
      const deadline = new Date(task['срок'])
      const nowMs = now.getTime()
      const deadlineMs = deadline.getTime()

      const lateMinutes = nowMs > deadlineMs ? Math.floor((nowMs - deadlineMs) / 60000) : 0
      const data = {
        статус: 'выполнена',
        потраченное_время_в_минутах: (seconds / 60).toFixed(2),
        опоздание_по_задаче_в_минутах: lateMinutes
      }

      try {
        await API.putTask(task.id, data)
      } catch (err) {
        console.error('❌ Ошибка при обновлении задачи:', err.response?.data || err.message)
        alert('Ошибка при завершении задачи.')
      }
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateDeadline = async () => {
    const [day, month, year] = formData.дата.split('.')
    const [hour, minute] = formData.время.split(':')

    const iso = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`).toISOString()

    try {
      await API.putTask(task.id, { срок: iso })
      alert('Срок успешно обновлён!')
      Navigate('/')
    } catch (err) {
      console.error('Ошибка при обновлении срока:', err)
      alert('Не удалось обновить срок.')
    }
  }

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className={c.container} style={isStarted === 'в_процессе' || task['статус'] === 'в_процессе' ? { background: '#EFDF00' } : null}>
      {user['должность'] === 'Администратор' ? (
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
              <p><b>Статус задачи:</b> <span>{task['статус']}</span></p>
              <p><b>Потраченное время:</b> <span>{task['потраченное_время_в_минутах']}</span></p>
            </div>

            <div className={c.editDeadline}>
              <div className={c.edit}>
                <label><b>Изменить срок:</b></label>
                <div>
                  <IMaskInput
                    mask="00.00.0000"
                    placeholder="Срок дата"
                    onAccept={(value) => handleChange('дата', value)}
                  />
                </div>

                <div>
                  <IMaskInput
                    mask="00:00"
                    placeholder="Срок время"
                    onAccept={(value) => handleChange('время', value)}
                  />
                </div>
              </div>

              <button onClick={updateDeadline}>Сохранить срок</button>
            </div>
          </div>
        </div>
      ) : (
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
            <button onClick={handleButtonClick} style={isStarted === 'в_ожидании' ? { background: 'red' } : null}>
              {isStarted === 'в_ожидании' ? 'Приступаю' : 'Сделано'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskInfo