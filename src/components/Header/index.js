import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

function Header(props) {
  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-website-logo"
          />
        </Link>
        <ul className="desktop-nav-menu">
          <li className="nav-menu-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          className="desktop-logout-button"
          type="button"
          onClick={onClickLogoutBtn}
        >
          Logout
        </button>
        <div className="mobile-nav-menu-container">
          <ul className="mobile-nav-menu">
            <li className="nav-menu-item-mobile">
              <Link to="/" className="nav-link">
                <AiFillHome className="nav-bar-icon" />
              </Link>
            </li>

            <li className="nav-menu-item-mobile">
              <Link to="/jobs" className="nav-link">
                <BsFillBriefcaseFill className="nav-bar-icon" />
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <button
                className="mobile-logout-button"
                type="button"
                onClick={onClickLogoutBtn}
              >
                <FiLogOut className="nav-bar-icon" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
