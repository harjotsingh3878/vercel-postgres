import { IReviewerResponse, ISearchFilter } from "../types/reviewers";

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

export const addParam = (params: string, uri: string) => {
  if(!uri) uri.concat(`where ${params}`)
  else uri.concat(`AND ${params}`)
}

export const filterReviewers = (reviewers: IReviewerResponse[], searchFilter: ISearchFilter) => {
  const fileredReviewers: IReviewerResponse[] = reviewers.filter((review: IReviewerResponse) => {
    let requiredValue = false;
    if(searchFilter.searchText && searchFilter.searchType) {
      requiredValue = review[searchFilter.searchType as keyof IReviewerResponse].toLowerCase() === searchFilter.searchText.toLowerCase()
    }
    if(searchFilter.jobField) {
      requiredValue = review.job_field.toLowerCase() === searchFilter.jobField.toLowerCase()
    }
    if(searchFilter.location) {
      requiredValue = review.city.toLowerCase() === searchFilter.location.toLowerCase() || review.province.toLowerCase() === searchFilter.location.toLowerCase()
    }
    return requiredValue
  })

  return fileredReviewers;
}