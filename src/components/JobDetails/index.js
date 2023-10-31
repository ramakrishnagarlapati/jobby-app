import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import './index.css'
import Header from '../Header'
import SimilarJob from '../SimilarJob'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function JobDetails() {
  const {id} = useParams()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [jobDetails, setJobDetails] = useState({})
  const [similarJobs, setSimilarJobs] = useState([])

  const getFormattedData = object => ({
    id: object.id,
    companyLogoUrl: object.company_logo_url,
    companyWebsiteUrl: object.company_website_url,
    employmentType: object.employment_type,
    jobDescription: object.job_description,
    location: object.location,
    packagePerAnnum: object.package_per_annum,
    title: object.title,
    lifeAtCompany: {
      description: object.life_at_company.description,
      imageUrl: object.life_at_company.image_url,
    },
    skills: object.skills.map(eachItem => ({
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    })),
    rating: object.rating,
  })

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      setJobDetails(getFormattedData(data.job_details))
      setSimilarJobs(
        data.similar_jobs.map(item => ({
          id: item.id,
          companyLogoUrl: item.company_logo_url,
          employmentType: item.employment_type,
          jobDescription: item.job_description,
          location: item.location,
          rating: item.rating,
          title: item.title,
        })),
      )
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getJobDetails()
  }, [])

  const onClickFailureRetryBtn = () => {
    getJobDetails()
  }

  const onClickSimilarJobItem = () => {
    getJobDetails()
  }

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  const renderSkillItem = skill => {
    const {name, imageUrl} = skill
    return (
      <li className="skill-item" key={name}>
        <img src={imageUrl} alt={name} className="skill-image" />
        <p className="skill-name">{name}</p>
      </li>
    )
  }
  const renderJobDetailsView = () => {
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      title,
      lifeAtCompany,
      skills,
      rating,
    } = jobDetails

    return (
      <div className="job-details-success-view">
        <div className="job-details-container">
          <div className="job-details__header">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details__company-logo"
            />
            <div className="job-details__title-and-rating-wrapper">
              <h1 className="job-details__title">{title}</h1>
              <div className="job-details__rating-container">
                <AiFillStar className="job-details__rating-icon" />
                <p className="job-details__rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details__specifics-container">
            <div className="job-details__icon-and-value-wrapper">
              <MdLocationOn className="icon" />
              <p className="job-details__location">{location}</p>
            </div>
            <div className="job-details__icon-and-value-wrapper">
              <BsFillBriefcaseFill className="icon" />
              <p className="job-details__employment-type">{employmentType}</p>
            </div>
            <p className="job-details__salary">{packagePerAnnum}</p>
          </div>
          <div className="job-details__description-container">
            <div className="job-details__description-and-link-wrapper">
              <h1 className="job-details__description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="company-external-link">
                Visit <FiExternalLink className="external-link-icon" />
              </a>
            </div>
            <p className="job-details__description">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(skill => renderSkillItem(skill))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-desc-and-image-wrapper">
              <p className="life-at-company-desc">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>

        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(eachJob => (
              <SimilarJob
                key={eachJob.id}
                similarJobDetails={eachJob}
                onClickSimilarJobItem={onClickSimilarJobItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
  const renderFailureView = () => (
    <div className="job-details-failure-view">
      <FailureView onClickFailureRetryBtn={onClickFailureRetryBtn} />
    </div>
  )
  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderJobDetailsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }
  return (
    <div className="job-item-details-container">
      <Header />
      {renderProductDetails()}
    </div>
  )
}
export default JobDetails
