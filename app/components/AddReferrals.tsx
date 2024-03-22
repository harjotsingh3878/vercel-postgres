"use client"

import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { addReferral, editReferral, getReferralById } from '../api'
import { JOB_FIELDS } from '../misc/constants'
import { IReferral } from '../types/referrals'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { IoMdClose } from 'react-icons/io'
import { parseReferral } from '../misc/utils'

const AddReferral = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isAdmin = searchParams.get('admin')
  const params = useParams()
  let referralId = '';
  if(!Array.isArray(params.slug)) {
    referralId = params.slug || '';
  }
  const initialReferral: IReferral = {
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

  const [newReferral, setNewReferral] = useState<IReferral>(initialReferral)
  const [showMessage, setShowMessage] = useState<string>('')

  useEffect(() => {
    const getReferral = async () => {
      const resp  = await getReferralById(referralId)
      const referral = resp && parseReferral(resp)
      if(referral) setNewReferral(referral)
      else setShowMessage('notFound')
    }
    if(referralId) getReferral()
  }, [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if(!newReferral.fullname || !newReferral.email ||
      !newReferral.company || !newReferral.jobTitle || !newReferral.province) return
    let referral;
    if(isAdmin && referralId) {
      const referralData = {
        ...newReferral,
        id: parseInt(referralId)
      }
      referral = await editReferral(referralData)
    } else {
      referral = await addReferral(newReferral)
    }
    
    if(referral && referralId && isAdmin) {
      router.push(`/view-referrals?admin=true`)
    }
    else if(referral) {
      setNewReferral(initialReferral)
      setShowMessage('success')
    }
    else setShowMessage('error')
  }

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setNewReferral({
      ...newReferral,
      [e.target.name]: e.target.value
    })
  }

  const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    setNewReferral({
      ...newReferral,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='max-w-2xl mx-auto mt-16'>
      {/* {<div role="alert" className="alert alert-error mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Enter all details correctly to continue</span>
      </div>} */}
      {showMessage === 'success' && <div role="alert" className="alert alert-success mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Referral was successfully added!</span>
      </div>}
      {showMessage === 'error' && <div role="alert" className="alert alert-error mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Unable to add referral. Please try again!</span>
      </div>}
      {showMessage === 'notFound' && <div role="alert" className="alert alert-error mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Unable to find referral. Please try again!</span>
        <span style={{ cursor: 'pointer' }} onClick={() => setShowMessage('')}><IoMdClose /></span>
      </div>}
      {((isAdmin && newReferral.email) || !isAdmin) && <form onSubmit={handleSubmit} className='flex flex-col'>
        <input
          value={newReferral.fullname}
          onChange={handleInput}
          name="fullname"
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full mb-3" />
        <input
          value={newReferral.company}
          onChange={handleInput}
          name="company"
          type="text"
          placeholder="Company"
          className="input input-bordered w-full mb-3" />
        <div className='flex flex-row gap-4'>
          <input
            value={newReferral.jobTitle}
            onChange={handleInput}
            name="jobTitle"
            type="text"
            placeholder="Job Title"
            className="input input-bordered w-full mb-3" />
          <select
            value={newReferral.jobField}
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
          value={newReferral.streetAddress}
          onChange={handleInput}
          name="streetAddress"
          type="text"
          placeholder="Company Street Address"
          className="input input-bordered mb-3 w-full" />
        <div className='flex flex-row gap-4'>
          <input
            value={newReferral.city}
            onChange={handleInput}
            name="city"
            type="text"
            placeholder="City"
            className="input input-bordered mb-3 w-full" />
          <select
            value={newReferral.province}
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
          value={newReferral.mobile}
          onChange={handleInput}
          name="mobile"
          type="number"
          placeholder="Mobile"
          maxLength={10}
          className="input input-bordered w-full mb-3" />
        <input
          value={newReferral.email}
          onChange={handleInput}
          name="email"
          type="text"
          placeholder="Email"
          className="input input-bordered w-full mb-3" />

        <div className='flex flex-row gap-4 mt-5 w-full'>
          <Link href="/view-referrals" className='flex-1' passHref>
            <button className='btn w-full'>Cancel</button>
          </Link>
          <button type='submit' className='btn btn-primary flex-1'>Submit</button>
        </div>
      </form>}
    </div>
  )
}

export default AddReferral