import React from 'react'
import { IReferralResponse } from '../types/referrals'

interface ReferralProps {
  referral: IReferralResponse
}

const Referral: React.FC<ReferralProps> = ({ referral }) => {
  return (
    <div className="collapse collapse-arrow bg-base-200 mb-2">
      <input type="radio" name="my-accordion-2" /> 
      <div className="collapse-title text-xl font-medium">
        {referral.fullname} <span className='text-sm'>({referral.job_title} at {referral.company})</span>
      </div>
      <div className="collapse-content"> 
        <div className='content text-sm px-5 py-5'>
          <div className='flex flex-row gap-4 mb-3'>
            <div className='flex-1 flex flex-row gap-2'>
              <div className='font-bold'>Field</div>
              <div>{referral.job_field}</div>
            </div>
            <div className='flex-1 flex flex-row gap-2'>
              <div className='font-bold'>Mobile</div>
              <div>{referral.mobile}</div>
            </div>
            <div className='flex-1 flex flex-row gap-2'>
              <div className='font-bold'>Email</div>
              <div>{referral.email}</div>
            </div>
          </div>
          <div className='flex flex-row gap-4 mb-3'>
            <div className='flex-1 flex flex-row gap-2'>
              <div className='font-bold'>Address</div>
              <div>{referral.street_address}, {referral.city}, {referral.province}</div>
            </div>
          </div>
        </div>
      {/* <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          <tr>
            <tr>
              <th>Job Field</th>
              <td colSpan={3}>{referral.job_field}</td>
            </tr>
            <th>Mobile</th>
            <td>{referral.mobile}</td>
            <th>Email</th>
            <td>{referral.email}</td>
          </tr>
          <tr>
            <th>Company Address</th>
            <td colSpan={3}>{referral.street_address}, {referral.city}, {referral.province}</td>
          </tr>
        </tbody>
      </table>
    </div> */}
      </div>
    </div>
  )
}

export default Referral