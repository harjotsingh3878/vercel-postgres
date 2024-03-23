import { IReferral, IReferralResponse, ISearchFilter } from '../types/referrals';
import { generateSearchParams } from '../misc/utils';

const baseUrl = `${process.env.NEXT_PUBLIC_URL}`
export const getAllReferrals = async (): Promise<IReferralResponse[]> => {
  const response =  await fetch(`${baseUrl}/api/referrals`, { cache: 'no-store'});
  const referralResp = await response.json();
  return referralResp.referrals ? referralResp.referrals : [];
}

export const getReferrals = async (searchFilter: ISearchFilter): Promise<IReferralResponse[]> => {
  const response =  await fetch(`${baseUrl}/api/referrals?${generateSearchParams(searchFilter)}`, {
    cache: 'no-store'
  });
  const referralResp = await response.json();
  return referralResp.referrals ? referralResp.referrals : [];
}

export const getReferralById = async (referralId: string): Promise<IReferralResponse> => {
  const response =  await fetch(`${baseUrl}/api/referral?id=${referralId}`, { cache: 'no-store'});
  const referralResp = await response.json();
  return referralResp.referral;
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

export const editReferral = async (referral: IReferral): Promise<IReferral> => {
  const response =  await fetch(`${baseUrl}/api/edit-referral`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(referral)
  });
  const referralResp = await response.json();
  return referralResp.referral ? referralResp.referral : {};
}

export const deleteReferral = async (referralId: number): Promise<void> => {
  await fetch(`${baseUrl}/api/delete-referral?id=${referralId}`, {
    method: 'DELETE'
  });
}