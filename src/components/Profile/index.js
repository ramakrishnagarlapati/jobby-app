import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function Profile() {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profileDetails, setProfileDetails] = useState({})
  const getProfileDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok) {
      const data = await response.json()
      setProfileDetails({
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      })
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }
  useEffect(() => {
    getProfileDetails()
  }, [])
  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  const renderSuccessProfileView = () => {
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="user-profile-container">
        <img
          src={profileImageUrl}
          alt="profile"
          className="user-profile-image"
        />
        <h1 className="user-profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }
  const renderFailureProfileView = () => (
    <div className="profile-failure-container">
      <button
        className="profile-retry-button"
        type="button"
        onClick={() => getProfileDetails()}
      >
        Retry
      </button>
    </div>
  )
  const renderProfile = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessProfileView()
      case apiStatusConstants.failure:
        return renderFailureProfileView()
      default:
        return null
    }
  }
  return <div className="profile-view-container">{renderProfile()}</div>
}
export default Profile
