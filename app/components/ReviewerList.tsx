import React from 'react'
import { IReviewerResponse } from '../types/reviewers'
import Reviewer from './Reviewer'

interface IReviewerListProps {
  reviewers: IReviewerResponse[]
}

const ReviewerList = ({ reviewers }: IReviewerListProps) => {
  return (
    <div className="overflow-x-auto mt-4">
      {reviewers.map(reviewer => (
        <Reviewer reviewer={reviewer} key={reviewer.id}/>
      ))}
    </div>
  )
}

export default ReviewerList