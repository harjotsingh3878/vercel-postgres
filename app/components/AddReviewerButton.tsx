import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

const AddReviewerButton = () => {
  return (
    <>
      <button className='btn btn-primary w-full'>
        Add Reviewer
        <AiOutlinePlus />
      </button>
    </>
  )
}

export default AddReviewerButton