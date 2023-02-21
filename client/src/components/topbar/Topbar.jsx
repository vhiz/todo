import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../context/authContext'
import './topbar.scss'


export default function Topbar() {

  const {currentUser} = useContext(AuthContext)
  return (
    <div className="topbar">
      <div className="left">
        <span>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            Todo
          </Link>
        </span>
      </div>
      <div className="right">
        <div className="user">
          <span>{currentUser.username}</span>
        </div>
      </div>
    </div>

  )
}
