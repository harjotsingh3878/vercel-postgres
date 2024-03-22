"use client"

import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { addReferral, editReferral, getReferralById } from '../api'
import { JOB_FIELDS, PROVINCES } from '../misc/constants'
import { IReferral } from '../types/referrals'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { IoMdClose } from 'react-icons/io'
import { parseReferral } from '../misc/utils'
import { useForm } from "react-hook-form";

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

  const { register, handleSubmit, formState: { errors } } = useForm();
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

  const registerOptions = {
    fullname: { required: "Name is required" },
    company: { required: "Email is required" },
    jobTitle: { required: "Email is required" },
    jobField: { required: "Email is required" },
    streetAddress: { required: "Email is required" },
    city: { required: "Email is required" },
    province: { required: "Email is required" },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Invalid email address',
      },
    },
    mobile: {
      required: "Mobile is required",
      minLength: {
        value: 10,
        message: "Mobile must have at least 10 characters"
      },
      maxLength: {
        value: 15,
        message: "Mobile should not have more than 15 characters"
      }
    }
  };

  const handleError = (errors: any) => console.log(errors);

  const handleRegistration = async () => {
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
      {(errors.fullname || errors.comapny) && <div role="alert" className="alert alert-error mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Enter all required fields to continue</span>
      </div>}
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
      {((isAdmin && newReferral.email) || !isAdmin) && <form onSubmit={handleSubmit(handleRegistration, handleError)} className='flex flex-col'>
        <input
          value={newReferral.fullname}
          {...register('fullname', registerOptions.fullname)}
          onChange={handleInput}
          name="fullname"
          type="text"
          placeholder="Full Name"
          className={`${errors?.fullname && 'input-error'} input input-bordered w-full mb-3`} />
        <input
          value={newReferral.company}
          {...register('company', registerOptions.company)}
          onChange={handleInput}
          name="company"
          type="text"
          placeholder="Company"
          className={`${errors?.company && 'input-error'} input input-bordered w-full mb-3`} />
        <div className='flex flex-row gap-4'>
          <input
            value={newReferral.jobTitle}
            {...register('jobTitle', registerOptions.jobTitle)}
            onChange={handleInput}
            name="jobTitle"
            type="text"
            placeholder="Job Title"
            className={`${errors?.jobTitle && 'input-error'} input input-bordered w-full mb-3`} />
          <select
            value={newReferral.jobField}
            {...register('jobField', registerOptions.jobField)}
            onChange={handleSelect}
            name="jobField"
            className={`${errors?.jobField && 'select-error'} select select-bordered w-full max-w-xs mb-3`}>
            <option disabled value={''}>Select job field</option>
            {Object.entries(JOB_FIELDS).map(field => (
              <option value={field[0]} key={field[0]}>{field[1]}</option>
            ))}
          </select>
        </div>
        <input
          value={newReferral.streetAddress}
          {...register('streetAddress', registerOptions.streetAddress)}
          onChange={handleInput}
          name="streetAddress"
          type="text"
          placeholder="Company Street Address"
          className={`${errors?.streetAddress && 'input-error'} input input-bordered w-full mb-3`} />
        <div className='flex flex-row gap-4'>
          <input
            value={newReferral.city}
            {...register('city', registerOptions.city)}
            onChange={handleInput}
            name="city"
            type="text"
            placeholder="City"
            className={`${errors?.city && 'input-error'} input input-bordered w-full mb-3`} />
          <select
            value={newReferral.province}
            {...register('province', registerOptions.province)}
            onChange={handleSelect}
            name="province"
            className={`${errors?.province && 'select-error'} select select-bordered w-full max-w-xs mb-3`}>
            <option disabled value={''}>Select province</option>
            {Object.entries(PROVINCES).map(field => (
              <option value={field[0]} key={field[0]}>{field[1]}</option>
            ))}
          </select>
          <input
            type="text"
            readOnly={true}
            value="Canada"
            className={`input input-bordered w-full mb-3`} />
        </div>
        <input
          value={newReferral.mobile}
          {...register('mobile', registerOptions.mobile)}
          onChange={handleInput}
          name="mobile"
          type="number"
          placeholder="Mobile"
          maxLength={15}
          className={`${errors?.mobile && 'input-error'} input input-bordered w-full mb-3`} />
          {/* <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div> */}
        <input
          value={newReferral.email}
          {...register('email', registerOptions.email)}
          onChange={handleInput}
          name="email"
          type="text"
          placeholder="Email"
          className={`${errors?.email && 'input-error'} input input-bordered w-full mb-3`} />

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