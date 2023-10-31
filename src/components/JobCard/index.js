import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

function JobCard({jobDetails}) {
  const {
    id,
    rating,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-item">
        <header className="job-card-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-and-rating-wrapper">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="rating-icon" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </header>
        <div className="job-specifics-container">
          <div className="icon-and-value-wrapper">
            <MdLocationOn className="job-card-icon" />
            <p className="location">{location}</p>
          </div>
          <div className="icon-and-value-wrapper">
            <BsFillBriefcaseFill className="job-card-icon" />
            <p className="employment-type">{employmentType}</p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <div className="job-card-desc-container">
          <h1 className="job-desc-heading">Description</h1>
          <p className="job-desc">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
