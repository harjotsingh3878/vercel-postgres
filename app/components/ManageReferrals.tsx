"use client"

import { useEffect, useState } from 'react'
import AddReferralButton from './AddReferralButton'
import FilterReferrals from './FilterReferrals'
import ReferralList from './ReferralsList'
import { IReferralResponse } from '../types/referrals'

interface IManageReferrals {
  referrals: IReferralResponse[];
  isAdmin: boolean;
}

const ManageReferrals: React.FC<IManageReferrals> = ({ referrals, isAdmin }) => {
  const [filteredReferrals, setFilteredReferrals] = useState<IReferralResponse[]>([])
  const [viewMode, setViewMode] = useState<boolean>(true)

  useEffect(() => {
    setFilteredReferrals(referrals)
  }, referrals)
  return (
    <>
      <div className="my-5 flex flex-col gap-4">
        <div className='flex flex-row justify-between w-full'>
          <h1 className="text-2xl font-bold mb-20">View Referrals</h1>
            <AddReferralButton />
        </div>
        <FilterReferrals
          referrals={referrals}
          setReferrals={setFilteredReferrals}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <ReferralList referrals={filteredReferrals} viewMode={viewMode} isAdmin={isAdmin} loading={false} />
      </div>
    </>
  )
}

export default ManageReferrals