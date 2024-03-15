"use client"
import React, { useEffect, useState } from 'react'
import { IReviewer } from '../types/reviewers'
import Reviewer from './Reviewer'
import { getAllReviewers } from '../api'

const ReviewerList = () => {
  const [reviewers, setReviewers] = useState<IReviewer[]>([])
  useEffect(() => {
    const getReviewers = async () => {
      const resp = await getAllReviewers()
      setReviewers(resp)
    }
    getReviewers()
  }, [])
  
  return (
    <div className="overflow-x-auto mt-4">
      {reviewers.map(reviewer => (
        <Reviewer reviewer={reviewer} key={reviewer.email}/>
      ))}
    </div>
  )
}

export default ReviewerList