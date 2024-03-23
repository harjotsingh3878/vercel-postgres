import { IReferral, IReferralResponse, ISearchFilter } from '../types/referrals';
import { generateSearchWhereNew } from '../misc/utils';
import prisma from '@/lib/prisma';

const baseUrl = `${process.env.NEXT_PUBLIC_URL}`
export const getAllReferrals = async (): Promise<IReferralResponse[]> => {
  const referrals = await prisma.referrals.findMany();
  return referrals ? referrals : [];
}

export const getReferrals = async (searchFilter: ISearchFilter): Promise<IReferralResponse[]> => {
  const constructedWhere = searchFilter ? generateSearchWhereNew(searchFilter) : {}
  const referrals = await prisma.referrals.findMany({
    where: constructedWhere
  });
  return referrals ? referrals : [];
}

export const getReferralById = async (referralId: string): Promise<IReferralResponse | null> => {
  const referral = await prisma.referrals.findUnique({
    where: {
      id: parseInt(referralId)
    }
  });
  return referral;
}

export const addReferral = async (referral: IReferral): Promise<IReferral> => {
  const response =  await fetch(`${baseUrl}/api/add-referral`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(referral)
  });
  const referralResp = await response.json();
  return referralResp.referral ? referralResp.referral : {};
}

export const editReferral = async (referral: IReferral): Promise<IReferralResponse> => {
  const newReferral = await prisma.referrals.create({
    data: {
      fullname: referral?.fullname,
      company: referral?.company,
      job_title: referral?.jobTitle,
      job_field: referral?.jobField,
      street_address: referral?.streetAddress,
      province: referral?.province,
      city: referral?.city,
      mobile: referral?.mobile,
      email: referral?.email,
    },
  });
  return newReferral;
}

export const deleteReferral = async (referralId: number): Promise<void> => {
  await prisma.referrals.delete({
    where: {
      id: referralId,
    },
  })
}