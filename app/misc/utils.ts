import { ISearchFilter } from "../types/reviewers";

export const generateSearchParams = (searchFilter: ISearchFilter) => {
  let params = '';
  if(searchFilter.searchText && searchFilter.searchType) {
    params.concat(`filterText=${searchFilter.searchText}&filterType=${searchFilter.searchType}&`)
  }

  if(searchFilter.jobField) {
    params.concat(`jobField=${searchFilter.jobField}`)
  }
  return params;
}

export const generateSearchUrl = (searchParams: URLSearchParams) => {
  let uri = '';
  const searchText = searchParams.get('searchText');
  const searchType = searchParams.get('searchType');
  const jobField = searchParams.get('jobField');

  if(searchText && searchType) {
    addParam(`${searchType}=${searchText}`, uri)
  }
  if(jobField) {
    addParam(`jobField=${jobField}`, uri)
  }

  return uri;
}

export const addParam = (params: string, uri: string) => {
  if(!uri) uri.concat(`where ${params}`)
  else uri.concat(`AND ${params}`)
}