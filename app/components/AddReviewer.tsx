"use client"

import React, { FormEventHandler, useState } from 'react'

const AddReviewer = () => {
  const initialReviewer = {
    name: '',
    company: '',
    jobTitle: '',
    streetAddress: '',
    province: '',
    city: '',
    mobile: '',
    email: ''
  }
  const [newReviewer, setNewReviewer] = useState(initialReviewer)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='mt-5 flex justify-content flex-col'>
        <input
          value={newReviewer.name}
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full mb-3" />
        <input
          value={newReviewer.company}
          type="text"
          placeholder="Company"
          className="input input-bordered w-full mb-3" />
        <input
          value={newReviewer.jobTitle}
          type="text"
          placeholder="Job Title"
          className="input input-bordered w-full mb-3" />
        <input
          value={newReviewer.streetAddress}
          type="text"
          placeholder="Company Street Address"
          className="input input-bordered mb-3 w-full" />
        <div className='flex flex-row'>
          <input
            value={newReviewer.city}
            type="text"
            placeholder="City"
            className="input input-bordered mb-3 w-full" />
          <select className="select select-bordered max-w-xs ml-2">
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NS">Nova Scotia</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
          </select>
          <input
            type="text"
            readOnly={true}
            value="Canada"
            className="input input-bordered mb-3 w-full" />
        </div>
        <input
          value={newReviewer.mobile}
          type="text"
          placeholder="Mobile"
          className="input input-bordered w-full mb-3" />
        <input
          value={newReviewer.email}
          type="text"
          placeholder="Email"
          className="input input-bordered w-full mb-3" />

        <button type='submit' className='btn mt-5'>Submit</button>
      </form>
    </>
  )
}

export default AddReviewer