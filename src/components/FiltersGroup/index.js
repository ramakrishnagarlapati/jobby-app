import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import './index.css'

function FiltersGroup(props) {
  const {
    searchInput,
    setSearchInput,
    selectedSalaryRange,
    handleRadioChange,
    selectedTypes,
    handleCheckboxChange,
    employmentTypesList,
    salaryRangesList,
    onClickSearchButton,
    onEnterSearchInput,
  } = props
  const renderSearchInput = () => (
    <div className="search-input-container">
      <input
        value={searchInput}
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={e => setSearchInput(e.target.value)}
        onKeyDown={onEnterSearchInput}
      />

      <button
        type="button"
        data-testid="searchButton"
        onClick={onClickSearchButton}
        className="search-button"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  const renderCheckbox = type => {
    const {employmentTypeId, label} = type
    return (
      <li className="employment-type-item" key={employmentTypeId}>
        <label
          htmlFor={employmentTypeId}
          key={employmentTypeId}
          className="custom-label"
        >
          <input
            type="checkbox"
            id={employmentTypeId}
            className="employment-type-checkbox"
            name={employmentTypeId}
            value={employmentTypeId}
            checked={selectedTypes.includes(employmentTypeId)}
            onChange={handleCheckboxChange}
          />
          {label}
        </label>
      </li>
    )
  }

  const renderEmploymentTypes = () => (
    <div className="employment-types-container">
      <h1 className="employment-types-heading">Type of Employment</h1>
      <ul className="employment-types-list">
        {employmentTypesList.map(type => renderCheckbox(type))}
      </ul>
    </div>
  )
  const renderRadioEl = range => {
    const {salaryRangeId, label} = range
    return (
      <li className="salary-range-item" key={salaryRangeId}>
        <label
          htmlFor={salaryRangeId}
          key={salaryRangeId}
          className="custom-label"
        >
          <input
            type="radio"
            name="salaryRange"
            id={salaryRangeId}
            value={salaryRangeId}
            className="salary-range-radio-input"
            checked={selectedSalaryRange === salaryRangeId}
            onChange={handleRadioChange}
          />
          {label}
        </label>
      </li>
    )
  }

  const renderRadioButtons = () => (
    <div className="salary-range-container">
      <h1 className="salary-range-heading">Salary Range</h1>
      <ul className="salary-range-list">
        {salaryRangesList.map(range => renderRadioEl(range))}
      </ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <Profile />
      <hr className="input-group-separator" />
      {renderEmploymentTypes()}
      <hr className="input-group-separator" />
      {renderRadioButtons()}
    </div>
  )
}
export default FiltersGroup
