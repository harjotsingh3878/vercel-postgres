"use client"

import { useEffect, useState } from 'react'
import AddReviewerButton from './AddReviewerButton'
import FilterReviewers from './FilterReviewers'
import ReviewerList from './ReviewerList'
import { IReviewerResponse } from '../types/reviewers'
import { getAllReviewers } from '../api'

const ManageReviewers = () => {
  const [reviewers, setReviewers] = useState<IReviewerResponse[]>([])
  useEffect(() => {
    const getReviewers = async () => {
      const resp  = await getAllReviewers()
      setReviewers(resp)
    }
    getReviewers()
  }, [])
  return (
    <>
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Manage Reviewers</h1>
        <AddReviewerButton />
        <FilterReviewers setReviewers={setReviewers}/>
      </div>
      <ReviewerList reviewers={reviewers}/>
    </>
  )
}

export default ManageReviewers