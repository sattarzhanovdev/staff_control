import React from 'react'
import { Components } from '../../components'
import c from './tasks.module.scss'
import { Icons } from '../../assets/icons'

const Tasks = () => {
  const [ active, setActive ] = React.useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className={c.tasksPage}>
      <div className={c.addTask}>
        {
          user['должность'] === 'Администратор' && (<button onClick={() => setActive(!active)}>
            Добавить задачу
            <img src={Icons.arrow} alt="" />
          </button> )
        }
      </div>

      <Components.Tasks />
      {active && <Components.AddTask setActive={setActive} />}
    </div>
  )
}

export default Tasks