import React from 'react'
import c from './navbar.module.scss'
import { Navlist } from '../../utils'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const Navigate = useNavigate()
  const path = useLocation().pathname

  return (
    <div className={c.navbar}>
      {
        Navlist.map((item, index) => (
          <div key={index} className={c.navItem} onClick={() => Navigate(item.path)}>
            <img src={path === item.path ? item.activeIcon : item.icon} alt="" />
            <p style={path === item.path ? {color: "#555"} : null}>{item.name}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Navbar