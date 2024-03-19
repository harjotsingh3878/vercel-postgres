import Link from 'next/link'
import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'

const AddReviewerButton = () => {
  return (
    <>
      <Link href="/add-reviewer" passHref>
        <button className='btn btn-primary w-full'>
          Add Reviewer
          <IoIosAddCircleOutline size={20}/>
        </button>
      </Link>
      
    </>
  )
}

export default AddReviewerButton