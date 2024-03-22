import Link from 'next/link'
import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'

const AddReferralButton = () => {
  return (
    <>
      <Link href="/add-referral" passHref>
        <button className='btn btn-primary w-full'>
          Add Referral
          <IoIosAddCircleOutline size={20}/>
        </button>
      </Link>
      
    </>
  )
}

export default AddReferralButton