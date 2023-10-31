import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsgText, setErrorMsgText] = useState('')
  const onSubmitForm = async e => {
    e.preventDefault()
    const userDetails = {username, password}
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = props
      history.replace('/')
    } else {
      setErrorMsgText(data.error_msg)
      setShowSubmitError(true)
    }
  }
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={onSubmitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="login-page-logo-image"
        />
        <div className="input-container">
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="input-field"
            id="username"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
            id="password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsgText}</p>}
      </form>
    </div>
  )
}
export default Login
