"use client"

import { useEffect, useState } from 'react'
import AddReviewerButton from './AddReviewerButton'
import FilterReviewers from './FilterReviewers'
import ReviewerList from './ReviewerList'
import { IReviewerResponse } from '../types/reviewers'
import { getAllReviewers } from '../api'

const ManageReviewers = () => {
  const [reviewers, setReviewers] = useState<IReviewerResponse[]>([])
  const [filteredReviewers, setFilteredReviewers] = useState<IReviewerResponse[]>([])
  const [viewMode, setViewMode] = useState(true)
  useEffect(() => {
    const getReviewers = async () => {
      const resp  = await getAllReviewers()
      setReviewers(resp)
      setFilteredReviewers(resp)
    }
    getReviewers()
  }, [])
  return (
    <>
      <div className="my-5 flex flex-col gap-4">
        <div className='flex flex-row justify-between w-full'>
          <h1 className="text-2xl font-bold mb-20">View Reviewers</h1>
          <AddReviewerButton />
        </div>
        <FilterReviewers
          reviewers={reviewers}
          setReviewers={setFilteredReviewers}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <ReviewerList reviewers={filteredReviewers} viewMode={viewMode}/>
      </div>
      
    </>
  )
}

export default ManageReviewers