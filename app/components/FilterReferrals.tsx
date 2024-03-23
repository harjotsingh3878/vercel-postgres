import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { FILTER_TYPES, JOB_FIELDS } from "../misc/constants"
import { IReferralResponse, ISearchFilter } from "../types/referrals";
import { CiViewList } from "react-icons/ci";
import { filterReferrals } from "../misc/utils";
import { AiOutlineTable } from "react-icons/ai";

interface IFilterReviewsProps {
  referrals: IReferralResponse[];
  setReferrals: Function;
  viewMode: boolean;
  setViewMode: Function;
}

const FilterReferrals = ({ referrals, setReferrals, viewMode, setViewMode }: IFilterReviewsProps) => {
  const initialFilter: ISearchFilter = {
    searchText: '',
    searchType: '',
    jobField: '',
    location: ''
  }
  const [searchFilter, setSearchFilter] = useState(initialFilter);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if((!searchFilter.searchText && !searchFilter.searchType
      && !searchFilter.jobField && !searchFilter.location) ||
      (searchFilter.searchType && !searchFilter.searchText)) {
        setReferrals(referrals)
        return
    }
    const fileredReferrals = filterReferrals(referrals, searchFilter)
    // for api filtering
    // if((searchFilter.searchText && !searchFilter.searchType) || !searchFilter.jobField) return
    // const referrals = await getReferrals(searchFilter);
    setReferrals(fileredReferrals)
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
    <div className="flex flex-row justify-between">
      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
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
            <option value=''>Filter By</option>
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
          className="select select-bordered w-full max-w-xs">
          <option value=''>Job Field</option>
          {Object.entries(JOB_FIELDS).map(field => (
            <option value={field[1]} key={field[0]}>{field[1]}</option>
          ))}
        </select>
        <input
            value={searchFilter.location}
            onChange={handleInput}
            name="location"
            className="input input-bordered join-item"
            placeholder="Location"/>
        <button type="submit" className="btn join-item">Search</button>
      </form>
      {/* <div role="tablist" className="tabs tabs-boxed items-center p-0">
        <a role="tab" title="Table View" style={{height: '2.6rem'}} className={`tab ${viewMode && 'tab-active'}`} onClick={() => setViewMode(true)}><AiOutlineTable size={30}/></a>
        <a role="tab" title="List View" style={{height: '2.6rem'}} className={`tab ${!viewMode && 'tab-active'}`} onClick={() => setViewMode(false)}><CiViewList size={30}/></a>
      </div> */}
    </div>
  )
}

export default FilterReferrals