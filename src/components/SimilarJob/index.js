import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

function SimilarJob({similarJobDetails, onClickSimilarJobItem}) {
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="similar-job-list-item" onClick={onClickSimilarJobItem}>
        <div className="similar-job-header">
          <img
            src={companyLogoUrl}
            alt=" similar job company logo"
            className="similar-job__company-logo"
          />
          <div className="similar-job__title-and-rating-wrapper">
            <h1 className="similar-job__title">{title}</h1>
            <div className="similar-job__rating-container">
              <AiFillStar className="similar-job__rating-icon" />
              <p className="similar-job__rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="similar-job__description-container">
          <h1 className="similar-job__description-heading">Description</h1>
          <p className="similar-job__description">{jobDescription}</p>
        </div>
        <div className="similar-job__specifics-container">
          <div className="similar-job__icon-and-value-wrapper">
            <MdLocationOn />
            <p className="similar-job__location">{location}</p>
          </div>
          <div className="similar-job__icon-and-value-wrapper">
            <BsFillBriefcaseFill />
            <p className="similar-job__employment-type">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default SimilarJob
