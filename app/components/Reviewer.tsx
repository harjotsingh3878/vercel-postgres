import React from 'react'
import { IReviewerResponse } from '../types/reviewers'

interface ReviewerProps {
  reviewer: IReviewerResponse
}

const Reviewer: React.FC<ReviewerProps> = ({ reviewer }) => {
  return (
    <div className="collapse collapse-arrow bg-base-200 mb-2">
      <input type="radio" name="my-accordion-2" /> 
      <div className="collapse-title text-xl font-medium">
        {reviewer.fullname} <span className='text-sm'>({reviewer.job_title} at {reviewer.company})</span>
      </div>
      <div className="collapse-content"> 
        <div className='content text-sm px-5 py-5'>
          <div className='flex flex-row justify-content-space-between gap-4 mb-3'>
            <div className='flex-1 flex flex-row justify-content-space-between gap-2'>
              <div className='font-bold'>Field</div>
              <div>{reviewer.job_field}</div>
            </div>
            <div className='flex-1 flex flex-row justify-content-space-between gap-2'>
              <div className='font-bold'>Mobile</div>
              <div>{reviewer.mobile}</div>
            </div>
            <div className='flex-1 flex flex-row justify-content-space-between gap-2'>
              <div className='font-bold'>Email</div>
              <div>{reviewer.email}</div>
            </div>
          </div>
          <div className='flex flex-row justify-content-space-between gap-4 mb-3'>
            <div className='flex-1 flex flex-row justify-content-space-between gap-2'>
              <div className='font-bold'>Address</div>
              <div>{reviewer.street_address}, {reviewer.city}, {reviewer.province}</div>
            </div>
          </div>
        </div>
      {/* <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          <tr>
            <tr>
              <th>Job Field</th>
              <td colSpan={3}>{reviewer.job_field}</td>
            </tr>
            <th>Mobile</th>
            <td>{reviewer.mobile}</td>
            <th>Email</th>
            <td>{reviewer.email}</td>
          </tr>
          <tr>
            <th>Company Address</th>
            <td colSpan={3}>{reviewer.street_address}, {reviewer.city}, {reviewer.province}</td>
          </tr>
        </tbody>
      </table>
    </div> */}
      </div>
    </div>
  )
}

export default Reviewer