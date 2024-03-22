"use client"

import { useEffect, useState } from 'react'
import AddReferralButton from './AddReferralButton'
import FilterReferrals from './FilterReferrals'
import ReferralList from './ReferralsList'
import { IReferralResponse } from '../types/referrals'
import { getAllReferrals } from '../api'

const ManageReferrals = () => {
  const [referrals, setReferrals] = useState<IReferralResponse[]>([])
  const [filteredReferrals, setFilteredReferrals] = useState<IReferralResponse[]>([])
  const [viewMode, setViewMode] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const getReferrals = async () => {
      const resp  = await getAllReferrals()
      setLoading(false)
      setReferrals(resp)
      setFilteredReferrals(resp)
    }
    getReferrals()
  }, [])
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
        <ReferralList referrals={filteredReferrals} viewMode={viewMode} loading={loading} />
      </div>
      
    </>
  )
}

export default ManageReferrals