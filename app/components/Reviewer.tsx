import React from 'react'
import { IReviewer } from '../types/reviewers'

interface ReviewerProps {
  reviewer: IReviewer
}

const Reviewer: React.FC<ReviewerProps> = ({ reviewer }) => {
  return (
    <div className="collapse collapse-arrow bg-base-200 mb-2" key={reviewer.name}>
      <input type="radio" name="my-accordion-2" /> 
      <div className="collapse-title text-xl font-medium">
        {reviewer.name} <span className='text-sm'>({reviewer.job_title} at {reviewer.company})</span>
      </div>
      <div className="collapse-content"> 
      <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          <tr>
            <th>Mobile</th>
            <td>{reviewer.mobile}</td>
            <th>Email</th>
            <td>{reviewer.email}</td>
          </tr>
          <tr>
            <th>Company Address</th>
            <td colSpan={3}>{reviewer.street_address}, {reviewer.city}, {reviewer.province} rewierhow3rh23894un r283u4203u4j2u34702384 3480723084uo2i3hrkjehwoufoi</td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
    </div>
  )
}

export default Reviewer