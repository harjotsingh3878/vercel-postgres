import { IReferralResponse, ISearchFilter } from "../types/referrals";

export const generateSearchParams = (searchFilter: ISearchFilter) => {
  let queryParams = '';
  if(searchFilter.searchText && searchFilter.searchType) {
    queryParams = queryParams.concat(`searchText=${searchFilter.searchText}&searchType=${searchFilter.searchType}&`)
  }

  if(searchFilter.jobField) {
    queryParams = queryParams.concat(`jobField=${searchFilter.jobField}`)
  }
  return queryParams;
}

export const generateSearchWhere = (searchParams: URLSearchParams) => {
  let params = {} as {[key: string]: string};
  const searchText = searchParams.get('searchText');
  const searchType = searchParams.get('searchType');
  const jobField = searchParams.get('jobField');

  if(searchText && searchType) {
    params[searchType] = searchText
  }
  if(jobField) {
    params.job_field = jobField
  }

  return params;
}

export const generateSearchWhereNew = (searchFilter: ISearchFilter) => {
  let params = {} as {[key: string]: string};

  if(searchFilter.searchText && searchFilter.searchType) {
    params[searchFilter.searchType] = searchFilter.searchText
  }
  if(searchFilter.jobField) {
    params.job_field = searchFilter.jobField
  }

  return params;
}

export const addParam = (params: string, uri: string) => {
  if(!uri) uri.concat(`where ${params}`)
  else uri.concat(`AND ${params}`)
}

export const filterReferrals = (referrals: IReferralResponse[], searchFilter: ISearchFilter) => {
  const fileredReferrals: IReferralResponse[] = referrals.filter((review: IReferralResponse) => {
    let requiredValue = false;
    if(searchFilter.searchText && searchFilter.searchType) {
      requiredValue = review[searchFilter.searchType as keyof IReferralResponse].toString().toLowerCase() === searchFilter.searchText.toLowerCase()
    }
    if(searchFilter.jobField) {
      requiredValue = review.job_field.toLowerCase() === searchFilter.jobField.toLowerCase()
    }
    if(searchFilter.location) {
      requiredValue = review.city.toLowerCase() === searchFilter.location.toLowerCase() || review.province.toLowerCase() === searchFilter.location.toLowerCase()
    }
    return requiredValue
  })

  return fileredReferrals;
}

export const parseReferral = (referralResp: IReferralResponse) => {
  return {
    id: referralResp.id,
    fullname: referralResp.fullname,
    company: referralResp.company,
    jobTitle: referralResp.job_title,
    jobField: referralResp.job_field,
    streetAddress: referralResp.street_address,
    province: referralResp.province,
    city: referralResp.city,
    mobile: referralResp.mobile,
    email: referralResp.email,
  }
}