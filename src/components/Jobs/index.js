import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'
import FailureView from '../FailureView'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function Jobs() {
  const [searchInput, setSearchInput] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [jobsList, setJobsList] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('')

  const getJobsFromApi = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedTypes.join()}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      setJobsList(
        data.jobs.map(item => ({
          id: item.id,
          title: item.title,
          rating: item.rating,
          companyLogoUrl: item.company_logo_url,
          employmentType: item.employment_type,
          jobDescription: item.job_description,
          location: item.location,
          packagePerAnnum: item.package_per_annum,
        })),
      )
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getJobsFromApi()
  }, [selectedTypes, selectedSalaryRange])

  const onClickSearchButton = () => {
    getJobsFromApi()
  }

  const onEnterSearchInput = e => {
    if (e.key === 'Enter') {
      getJobsFromApi()
    }
  }

  const handleCheckboxChange = e => {
    const {value} = e.target
    if (e.target.checked) {
      setSelectedTypes([...selectedTypes, value])
    } else {
      setSelectedTypes(selectedTypes.filter(type => type !== value))
    }
  }
  const handleRadioChange = e => {
    setSelectedSalaryRange(e.target.value)
  }
  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  const renderNoJobs = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-desc">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )
  const renderJobsList = () =>
    jobsList.length === 0 ? (
      renderNoJobs()
    ) : (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  const onClickFailureRetryBtn = () => {
    getJobsFromApi()
  }
  const renderFailureView = () => (
    <div className="job-details-error-view-container">
      <FailureView onClickFailureRetryBtn={onClickFailureRetryBtn} />
    </div>
  )
  const renderAllJobs = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderJobsList()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }
  return (
    <div className="jobs-page-container">
      <Header />
      <div className="jobs-page-responsive-container">
        <div className="side-bar">
          <FiltersGroup
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            selectedSalaryRange={selectedSalaryRange}
            handleRadioChange={handleRadioChange}
            selectedTypes={selectedTypes}
            handleCheckboxChange={handleCheckboxChange}
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            onClickSearchButton={onClickSearchButton}
            onEnterSearchInput={onEnterSearchInput}
          />
        </div>
        <div className="jobs-container">
          <div className="desktop-search-input-container">
            <input
              value={searchInput}
              type="search"
              className="desktop-search-input"
              placeholder="Search"
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={onEnterSearchInput}
            />

            <button
              type="button"
              data-testid="searchButton"
              className="desktop-search-button"
              onClick={onClickSearchButton}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="all-jobs-view-container">{renderAllJobs()}</div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
