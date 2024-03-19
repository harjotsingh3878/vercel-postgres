"use client"

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { FILTER_TYPES, JOB_FIELDS } from "../misc/constants"

const FilterReviewers = () => {
  const initialFilter = {
    searchText: '',
    searchType: '',
    jobField: '',
  }
  const [searchFilter, setSearchFilter] = useState(initialFilter);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if((!initialFilter.searchText && !initialFilter.searchType) || !initialFilter.jobField) return
    // await getReviewers(newReviewer);
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
          name="searchText"
          className="select select-bordered join-item">
          <option disabled defaultValue=''>Filter By</option>
          <option>{FILTER_TYPES.Name}</option>
          <option>{FILTER_TYPES.Company}</option>
          <option>{FILTER_TYPES.JobTitle}</option>
        </select>
      </div>
      <select
        value={searchFilter.jobField}
        onChange={handleSelect}
        name="jobField"
        className="select select-bordered w-full max-w-xs ml-2">
        <option disabled value=''>Select job field</option>
        {Object.entries(JOB_FIELDS).map(field => {
          return <option value={field[0]} key={field[0]}>{field[1]}</option>
        })}
      </select>
      <button className="btn join-item ml-2">Search</button>
    </form>
  )
}

export default FilterReviewers