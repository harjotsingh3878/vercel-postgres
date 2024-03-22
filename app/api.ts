import { IReferral, IReferralResponse, ISearchFilter } from './types/referrals';
import { generateSearchParams, parseReferral } from './misc/utils';

export const getAllReferrals = async (): Promise<IReferralResponse[]> => {
  const response =  await fetch('/api/referrals', { cache: 'no-store'});
  const referralResp = await response.json();
  return referralResp.referrals ? referralResp.referrals : [];
}

export const getReferrals = async (searchFilter: ISearchFilter): Promise<IReferralResponse[]> => {
  const response =  await fetch(`/api/referrals?${generateSearchParams(searchFilter)}`, {
    cache: 'no-store'
  });
  const referralResp = await response.json();
  return referralResp.referrals ? referralResp.referrals : [];
}

export const getReferralById = async (referralId: string): Promise<IReferralResponse> => {
  const response =  await fetch(`/api/referral?id=${referralId}`, { cache: 'no-store'});
  const referralResp = await response.json();
  return referralResp.referral;
}

export const addReferral = async (referral: IReferral): Promise<IReferral> => {
  const response =  await fetch('/api/add-referral', {
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
  const response =  await fetch('/api/edit-referral', {
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
  await fetch(`/api/delete-referral?id=${referralId}`, {
    method: 'DELETE'
  });
}