"use client"

import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { addReviewer } from '../api'
import { JOB_FIELDS } from '../misc/constants'
import { IReviewer } from '../types/reviewers'

const AddReviewer = () => {
  const initialReviewer: IReviewer = {
    fullname: '',
    company: '',
    jobTitle: '',
    jobField: '',
    streetAddress: '',
    province: '',
    city: '',
    mobile: '',
    email: ''
  }
  const [newReviewer, setNewReviewer] = useState(initialReviewer)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if(!newReviewer.fullname || !newReviewer.email || !newReviewer.company || !newReviewer.jobTitle || !newReviewer.province) return
    // await addReviewer(newReviewer);
    await addReviewer(newReviewer)
  }

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setNewReviewer({
      ...newReviewer,
      [e.target.name]: e.target.value
    })
  }

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    setNewReviewer({
      ...newReviewer,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='mt-5 flex justify-content flex-col'>
        <input
          value={newReviewer.fullname}
          onChange={handleInput}
          name="fullname"
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full mb-3" />
        <input
          value={newReviewer.company}
          onChange={handleInput}
          name="company"
          type="text"
          placeholder="Company"
          className="input input-bordered w-full mb-3" />
        <div className='flex flex-row'>
          <input
            value={newReviewer.jobTitle}
            onChange={handleInput}
            name="jobTitle"
            type="text"
            placeholder="Job Title"
            className="input input-bordered w-full mb-3" />
          <select
            value={newReviewer.jobField}
            onChange={handleSelect}
            name="jobField"
            className="select select-bordered w-full max-w-xs mb-3 ml-2">
            <option disabled value={''}>Select job field</option>
            {Object.entries(JOB_FIELDS).map(field => (
              <option value={field[0]} key={field[0]}>{field[1]}</option>
            ))}
          </select>
        </div>
        <input
          value={newReviewer.streetAddress}
          onChange={handleInput}
          name="streetAddress"
          type="text"
          placeholder="Company Street Address"
          className="input input-bordered mb-3 w-full" />
        <div className='flex flex-row'>
          <input
            value={newReviewer.city}
            onChange={handleInput}
            name="city"
            type="text"
            placeholder="City"
            className="input input-bordered mb-3 w-full" />
          <select
            value={newReviewer.province}
            onChange={handleSelect}
            name="province"
            className="select select-bordered max-w-xs ml-2">
            <option value="">Select</option>
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
            className="input input-bordered mb-3 ml-2 w-full" />
        </div>
        <input
          value={newReviewer.mobile}
          onChange={handleInput}
          name="mobile"
          type="text"
          placeholder="Mobile"
          maxLength={10}
          className="input input-bordered w-full mb-3" />
        <input
          value={newReviewer.email}
          onChange={handleInput}
          name="email"
          type="text"
          placeholder="Email"
          className="input input-bordered w-full mb-3" />

        <button type='submit' className='btn mt-5 btn-primary'>Submit</button>
      </form>
    </>
  )
}

export default AddReviewer