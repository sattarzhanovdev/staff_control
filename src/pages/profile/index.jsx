import React from 'react'
import { Components } from '../../components'
import c from './profile.module.scss'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  
  const Navigate = useNavigate()

  return (
    <div>
      <Components.User />
      {
        user['должность'] === 'Администратор' ? 
        (
          <div className={c.admin}>
            <button onClick={() => Navigate('/workers/')}>Работники</button>
            <button onClick={() => Navigate('/attendance/')}>Посещения</button>
            <button onClick={() => Navigate('/expenses/')}>Расходы</button>

          </div>
        ) : 
        <Components.ProfileDetails />
      }
    </div>
  )
}

export default Profile