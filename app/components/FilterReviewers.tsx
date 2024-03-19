import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { FILTER_TYPES, JOB_FIELDS } from "../misc/constants"
import { getReviewers } from "../api";
import { IReviewer } from "../types/reviewers";

interface IFilterReviewsProps {
  setReviewers: Function
}

const FilterReviewers = ({ setReviewers }: IFilterReviewsProps) => {
  const initialFilter = {
    searchText: '',
    searchType: '',
    jobField: '',
  }
  const [searchFilter, setSearchFilter] = useState(initialFilter);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if((searchFilter.searchText && !searchFilter.searchType) || !searchFilter.jobField) return
    const reviewers = await getReviewers(searchFilter);
    setReviewers(reviewers)
  }

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value
    })
  }

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row">
      <div className="join">
        <input
          value={searchFilter.searchText}
          onChange={handleInput}
          name="searchText"
          className="input input-bordered join-item"
          placeholder="Search"/>
        <select
          value={searchFilter.searchType}
          onChange={handleSelect}
          name="searchType"
          className="select select-bordered join-item">
          <option disabled value=''>Filter By</option>
          {Object.entries(FILTER_TYPES).map(field => (
            <option value={field[0
            ]} key={field[0]}>{field[1]}</option>
          ))}
        </select>
      </div>
      <select
        value={searchFilter.jobField}
        onChange={handleSelect}
        name="jobField"
        className="select select-bordered w-full max-w-xs ml-2">
        <option disabled value=''>Select job field</option>
        {Object.entries(JOB_FIELDS).map(field => (
          <option value={field[1]} key={field[0]}>{field[1]}</option>
        ))}
      </select>
      <button type="submit" className="btn join-item ml-2">Search</button>
    </form>
  )
}

export default FilterReviewers