import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

function ProtectedRoute(props) {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    return <Route {...props} />
  }
  return <Redirect to="/login" />
}
export default ProtectedRoute
