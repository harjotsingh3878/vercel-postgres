import React from 'react'
import { IReviewer } from '../types/reviewers'
import Reviewer from './Reviewer'

interface TodoListProps {
  reviewers: IReviewer[]
}

const ReviewerList: React.FC<TodoListProps> = ({ reviewers }) => {
  return (
    <div className="overflow-x-auto mt-4">
      {reviewers.map(reviewer => (
        <Reviewer reviewer={reviewer}/>
      ))}
    </div>
  )
}

export default ReviewerList