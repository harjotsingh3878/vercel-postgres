"use client"

import { IReferralResponse } from '../types/referrals'
import Referral from './Referral'

import { useSearchParams } from 'next/navigation'
import ReferralTable from './ReferralTable';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

interface IReferralListProps {
  referrals: IReferralResponse[];
  viewMode: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const ReferralList: React.FC<IReferralListProps> = ({ referrals, viewMode, isAdmin, loading }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<number>(0);

  return (
    <div className="overflow-x-auto mt-4">
      {/* column filtering code */}
      {/* <div className="inline-block border border-black shadow rounded">
        <select
          className="select select-bordered">
          <option disabled value=''>Toggle Columns</option>
          <option value=''>
            <label>
              <input
                {...{
                  type: 'checkbox',
                  className: 'checkbox',
                  checked: table.getIsAllColumnsVisible(),
                  onChange: table.getToggleAllColumnsVisibilityHandler(),
                }}
              />{' '}
              Toggle All
            </label>
          </option>
          {table.getAllLeafColumns().map(column => {
            return (
              <option value=''>
                <label>
                  <input
                    {...{
                      type: 'checkbox',
                      className: 'checkbox',
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />{' '}
                  {column.id}
                </label>
              </option>
            )
          })}
        </select>
        <div className="px-1 border-b border-black">
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{' '}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {column.id}
              </label>
            </div>
          )
        })}
      </div> */}
      {loading ? <div className='text-center mx-auto mt-10'>
          <span className="loading loading-spinner loading-lg"></span>
        </div> : 
        referrals.length > 0 ? (
          <>
            {viewMode ?
              <ReferralTable
                referrals={referrals}
                isAdmin={isAdmin}
                setDeleteModalOpen={setDeleteModalOpen} /> :
                referrals.map(referral => (
                  <div className='mt-5' key={referral.id}>
                    <Referral referral={referral} />
                  </div>
                ))}
          </>
      ) : 
      <div className='text-center mx-auto mt-10'>No results found</div>}
      <DeleteModal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}/>
    </div>
  )
}

export default ReferralList