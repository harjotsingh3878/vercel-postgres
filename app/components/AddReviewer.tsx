"use client"

import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { addReviewer } from '../api'
import { JOB_FIELDS } from '../misc/constants'
import { IReviewer } from '../types/reviewers'
import Link from 'next/link'

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
  const [showMessage, setShowMessage] = useState('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if(!newReviewer.fullname || !newReviewer.email || !newReviewer.company || !newReviewer.jobTitle || !newReviewer.province) return
    const reviewer = await addReviewer(newReviewer)
    if(reviewer) setShowMessage('success')
    else setShowMessage('error')
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
    <div className='max-w-2xl mx-auto'>
      {showMessage === 'success' && <div role="alert" className="alert alert-success mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Reviewer was successfully added!</span>
      </div>}
      {showMessage === 'error' && <div role="alert" className="alert alert-error mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Unable to add reviewer. Please try again!</span>
      </div>}
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
        <div className='flex flex-row justify-content-space-between gap-4'>
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
            className="select select-bordered w-full max-w-xs mb-3">
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
        <div className='flex flex-row justify-content-space-between gap-4'>
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
            className="select select-bordered max-w-xs">
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
            className="input input-bordered mb-3 w-full" />
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

        <div className='flex flex-row justify-content-space-between gap-4 mt-5 w-full'>
          <Link href="/" className='flex-1' passHref>
            <button className='btn w-full'>Cancel</button>
          </Link>
          <button type='submit' className='btn btn-primary flex-1'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddReviewer